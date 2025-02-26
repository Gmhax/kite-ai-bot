import { agents, rateLimitConfig } from "./src/core/core.js";
import { groqConfig } from "../config/config.js";
import agentService from "./src/services/agent.service.js";
import walletService from "./src/services/wallet.service.js";
import dashboard from "./src/utils/twist.js";
import { sleep, formatError } from "./src/utils/helpers.js";

let isRunning = true;
const stats = {
  total: 0,
  successful: 0,
  failed: 0,
};

const startTime = Date.now();

process.on("SIGINT", () => {
  dashboard.log("Stopping the script gracefully...");
  isRunning = false;
  setTimeout(() => {
    dashboard.log("Thank you for using Kite AI!");
    process.exit(0);
  }, 1000);
});

async function processAgentCycle(wallet, agentId, agentName) {
  try {
    dashboard.log(`Using Agent: ${agentName}`);
    const questionData = await agentService.sendQuestion(agentId);
    stats.total++;

    if (questionData) {
      dashboard.log(`Question: ${questionData.question}`);
      dashboard.log(`Answer: ${questionData?.response?.content ?? ""}`);

      const reported = await agentService.reportUsage(wallet, {
        agent_id: agentId,
        question: questionData.question,
        response: questionData?.response?.content ?? "No answer",
      });

      if (reported) {
        stats.successful++;
        dashboard.log("Usage data reported successfully!");
      } else {
        stats.failed++;
        dashboard.log("Usage report failed");
      }

      dashboard.updateStats(stats);
    } else {
      stats.failed++;
      dashboard.updateStats(stats);
    }
  } catch (error) {
    stats.failed++;
    dashboard.updateStats(stats);
    dashboard.log(`Error in agent cycle: ${formatError(error)}`);
  }
}

async function processWallet(wallet, cycleCount) {
  dashboard.log(`Processing wallet: ${wallet}`);
  dashboard.updateStatus(wallet, cycleCount, Date.now() - startTime);

  for (const [agentId, agentName] of Object.entries(agents)) {
    if (!isRunning) break;

    await processAgentCycle(wallet, agentId, agentName);

    if (isRunning) {
      const waitTime = rateLimitConfig.intervalBetweenCycles / 1000;
      dashboard.log(`Waiting ${waitTime} seconds before next attempt...`);
      await sleep(rateLimitConfig.intervalBetweenCycles);
    }
  }
}

async function startContinuousProcess(wallets) {
  let cycleCount = 1;

  while (isRunning) {
    dashboard.log(`Starting Cycle #${cycleCount}`);

    for (const wallet of wallets) {
      if (!isRunning) break;
      await processWallet(wallet, cycleCount);
    }

    cycleCount++;
    dashboard.updateProgress((cycleCount % 10) * 10);
  }
}

async function main() {
  try {
    const wallets = walletService.loadWallets();
    if (wallets.length === 0) {
      dashboard.log("No wallets found in accounts.js. Stopping program.");
      process.exit(1);
    }

    dashboard.log(`Loaded ${wallets.length} private keys from accounts.js`);
    dashboard.updateStatus("Initializing...");

    await startContinuousProcess(wallets);
  } catch (error) {
    dashboard.log(`An error occurred: ${formatError(error)}`);
    process.exit(1);
  }
}

main();
