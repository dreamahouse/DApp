import {ethers, JsonRpcProvider} from "ethers";
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config('./.env')

export async function mint(to, uri) {
    const provider = new JsonRpcProvider(process.env.RPC_URL);
    const signer = await provider.getSigner()
    const contractAddress=process.env.CONTRACT_ADDRESS
    const abi=JSON.parse(fs.readFileSync("./abis/MyNFT.json"))
    const contract = new ethers.Contract (contractAddress, abi, signer);
    const result = await contract.safeMint(to, uri);
    // console.log (result.hash)
}

// mint('0xcB26196930F24a6847a58dBf5d80C6254d8De620','https://sample.com')