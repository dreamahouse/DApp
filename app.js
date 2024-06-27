import express from "express";
import bodyParser from "body-parser"; //获取body信息的中间件
import fileUpload from "express-fileupload"; //上传文件的中间件
import { uploadFileToIPFS,uploadJSONToIPFS } from "./ipfs-uploader.js";
import { mint } from './nft-minter.js'
import dotenv from 'dotenv'//管理环境变量
dotenv.config('./.env')

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res) => {
  // res.send('hello world!')
  res.render("home");
});
app.post("/upload", (req, res) => {
  //console.log(req.files); //files返回的格式是{file:{name:'xxx.jpg',data:<Buffer xx xx xx... bytes>}}
  const title = req.body.title;
  const description = req.body.description;
  const file = req.files.file;
  const fileName = file.name;
  const filePath = "files/" + fileName;
  //将用户上传的文件保存在工程目录files文件夹下
  file.mv(filePath, async (erro) => {
    if (erro) {
      console.log(erro);
      res.status(500).send("erro occured");
    }
    const result = await uploadFileToIPFS(filePath);
    const fileCID = result.cid.toString();
    const metadata = {
      title: title,
      description: description,
      image: process.env.PRE_IPFS_URL + fileCID,
    };
    const metadataResult = await uploadJSONToIPFS(metadata);
    const metadataCid = metadataResult.cid.toString();
    
    const myAddress=process.env.WALLET_ADDRESS
    const tokenUri = process.env.PRE_IPFS_URL+metadataCid
    console.log(metadataCid)
    await mint(myAddress,tokenUri)
    res.json({
      message: "file upload success!",
      metadata: metadata,
    });
  });
  //写一个返回
});

app.listen(3000, () => {
  console.log("app listening on port 3000!");
});
