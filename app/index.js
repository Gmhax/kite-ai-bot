import { agents, rateLimitConfig } from './src/core/core.js';
import { groqConfig } from '../config/config.js';
import _0x3325db from './src/services/agent.service.js';
import _0x177a4e from './src/services/wallet.service.js';
import _0x132332 from './src/utils/twist.js';
import { sleep, formatError } from './src/utils/helpers.js';
let isRunning = true;
const stats = {
  'total': 0x0,
  'successful': 0x0,
  'failed': 0x0
};
const startTime = Date.now();
process.on("SIGINT", () => {
  _0x132332.log("Stopping the script gracefully...");
  isRunning = false;
  setTimeout(() => {
    _0x132332.log("Thank you for using Kite AI!");
    process.exit(0x0);
  }, 0x3e8);
});
async function processAgentCycle(_0x1744f5, _0x4a3e9c, _0x109251) {
  try {
    _0x132332.log("Using Agent: " + _0x109251);
    const _0x569eb7 = await _0x3325db.sendQuestion(_0x4a3e9c);
    0x0++;
    if (_0x569eb7) {
      _0x132332.log("Question: " + _0x569eb7.question);
      _0x132332.log("Answer: " + (_0x569eb7?.["response"]?.["content"] ?? ''));
      const _0x1aa115 = await _0x3325db.reportUsage(_0x1744f5, {
        'agent_id': _0x4a3e9c,
        'question': _0x569eb7.question,
        'response': _0x569eb7?.['response']?.['content'] ?? "No answer"
      });
      if (_0x1aa115) {
        0x0++;
        _0x132332.log("Usage data reported successfully!");
      } else {
        0x0++;
        _0x132332.log("Usage report failed");
      }
      _0x132332.updateStats(stats);
    } else {
      0x0++;
      _0x132332.updateStats(stats);
    }
  } catch (_0x51f54b) {
    0x0++;
    _0x132332.updateStats(stats);
    _0x132332.log("Error in agent cycle: " + formatError(_0x51f54b));
  }
}
async function processWallet(_0x13af1b, _0x5233f3) {
  _0x132332.log("Processing wallet: " + _0x13af1b);
  _0x132332.updateStatus(_0x13af1b, _0x5233f3, Date.now() - startTime);
  for (const [_0x32889f, _0x57a2bc] of Object.entries(agents)) {
    if (!isRunning) {
      break;
    }
    await processAgentCycle(_0x13af1b, _0x32889f, _0x57a2bc);
    if (isRunning) {
      const _0x318da2 = rateLimitConfig.intervalBetweenCycles / 0x3e8;
      _0x132332.log("Waiting " + _0x318da2 + " seconds before next attempt...");
      await sleep(rateLimitConfig.intervalBetweenCycles);
    }
  }
}
async function startContinuousProcess(_0x500e73) {
  let _0x164caf = 0x1;
  while (isRunning) {
    _0x132332.log("Starting Cycle #" + _0x164caf);
    for (const _0x1c1895 of _0x500e73) {
      if (!isRunning) {
        break;
      }
      await processWallet(_0x1c1895, _0x164caf);
    }
    _0x164caf++;
    _0x132332.updateProgress(_0x164caf % 0xa * 0xa);
  }
}
async function main() {
  try {
    const _0x1c3ed0 = _0x177a4e.loadWallets();
    if (_0x1c3ed0.length === 0x0) {
      _0x132332.log("No wallets found in accounts.js. Stopping program.");
      process.exit(0x1);
    }
    _0x132332.log("Loaded " + _0x1c3ed0.length + " private keys from accounts.js");
    _0x132332.updateStatus("Initializing...");
    await startContinuousProcess(_0x1c3ed0);
  } catch (_0x43a4a9) {
    _0x132332.log("An error occurred: " + formatError(_0x43a4a9));
    process.exit(0x1);
  }
}
main();
