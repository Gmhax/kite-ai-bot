import { Wallet } from "ethers";
import fs from "fs";

function loadWallets() {
  try {
    const data = fs.readFileSync("../../../accounts/accounts.js", "utf-8");
    const privateKeys = JSON.parse(data);

    const wallets = privateKeys.map((privateKey) => {
      try {
        const wallet = new Wallet(privateKey);
        return wallet.address; 
      } catch (error) {
        console.error("Invalid private key:", error.message);
        return null;
      }
    });

    return wallets.filter((wallet) => wallet !== null);
  } catch (error) {
    console.error("Error loading wallets:", error.message);
    return [];
  }
}

export default { loadWallets };
