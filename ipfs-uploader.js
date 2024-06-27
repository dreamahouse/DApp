import { create } from "kubo-rpc-client";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config('./.env')
// import { create, globSource } from 'ipfs'

const ipfs = create(process.env.IPFS_URL);
async function uploadFileToIPFS(filePath) {
  const file = fs.readFileSync(filePath);
  const result = await ipfs.add({ path: filePath, content: file });
  // console.log(result)
  return result
}

// uploadFileToIPFS ("files/yuanfang.jpg");

async function uploadJSONToIPFS(json) {
    const result = await ipfs.add (JSON.stringify(json));
    // console.log(result)
    return result;
}
    
// uploadJSONToIPFS({name: "test"})

export {uploadJSONToIPFS,uploadFileToIPFS}