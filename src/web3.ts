// @ts-nocheck
import Web3 from 'web3';

// Try to use provider from metamask
if (!window.ethereum) {
    throw new Error ('This app needs Metamask to work')
}

window.ethereum.request({ method: "eth_requestAccounts" });
const web3 = new Web3(window.ethereum);

export default web3;
