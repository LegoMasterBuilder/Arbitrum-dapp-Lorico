// @ts-nocheck
import { writable } from 'svelte/store';
import { ethers } from 'ethers';

// Store for the provider, signer, and account
export const provider = writable(null);
export const signer = writable(null);
export const account = writable(null);
export const daoContract = writable(null);

// Contract ABI and address
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractAbi = [
    // ABI of your DAO contract
];

// Function to connect to the wallet
export async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
            const ethersSigner = ethersProvider.getSigner();
            const userAccount = await ethersSigner.getAddress();

            provider.set(ethersProvider);
            signer.set(ethersSigner);
            account.set(userAccount);

            const contract = new ethers.Contract(contractAddress, contractAbi, ethersSigner);
            daoContract.set(contract);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    } else {
        console.error("MetaMask not found");
    }
}
