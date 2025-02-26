import fs from "fs";
import path from "path";
import { Wallet } from "ethers";

function loadWallets() {
  try {
    const filePath = path.resolve("../../../accounts/accounts.js");

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const privateKeys = JSON.parse(data); 

    return privateKeys.map((privateKey) => {
      try {
        return new Wallet(privateKey).address;
      } catch (error) {
        console.error("Invalid private key:", error.message);
        return null;
      }
    }).filter(Boolean);
  } catch (error) {
    console.error("Error loading wallets:", error.message);
    return [];
  }
}

export default { loadWallets };
