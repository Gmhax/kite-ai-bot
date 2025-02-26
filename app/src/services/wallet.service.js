import { ethers } from "ethers";
import { accounts } from "../../../accounts/accounts.js";

function loadWallets() {
  return accounts.map((privateKey) => {
    try {
      const wallet = new ethers.Wallet(privateKey);
      return wallet.address; 
    } catch (error) {
      console.error("Invalid private key:", privateKey);
      return null;
    }
  }).filter(Boolean);
}

export default { loadWallets };
