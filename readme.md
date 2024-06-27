
安装 npm i express-fileupload //上传文件的中间件
安装 npm install body-parser //获取req.body property.
安装 npm install nodemon  //更新页面
安装 npm install -g @remix-project/remixd 
    remixd                               //本地工程链接Remix
安装 npm i kubo-rpc-client //ipfs+js库  https://github.com/ipfs/js-kubo-rpc-client
npm install ethers
npx hardhat node//本地工程要运行这个节点，并且remix中网络环境要选择hardhat-provider

用户上传nft后台配置一个合约地址和一个tokenuri需要的环境：
1.remix连接本地工程 
  安装 npm install -g @remix-project/remixd 
  remixd                                                                                                //remixd
2.在remix中选择网络环境为hardhat-provider，并在工程中安装hardhat环境，启动hardhat服务，npx hardhat node         //npx hardhat node
3.在文件中引入ethers.js，通过ethers的JsonRpcProvider提供一个与链通信的节点服务，默认链接http://localhost:8545
4.每修改代码，需要执行node nft-minter.js重新编译                                                            //node nft-minter.js
5.在package.json中配置,
{
    "main":"app.js"
    "script":{
        "dev":"nodemon app.js"
    }
}
前提：安装 npm install nodemon  //更新页面，不用ctrl+c 在运行，更改代码即更新服务                               //npm run dev


注意：报错不能通过import引入模块，需要在package.json中添加:   "type":"module"

管理环境变量的库dotenv

touch .gitignore//添加gitignore文件，用法：
*.txt  ，*.xls  表示过滤某种类型的文件
target/ ：表示过滤这个文件夹下的所有文件
/test/a.txt ，/test/b.xls  表示指定过滤某个文件下具体文件
!*.java , !/dir/test/     !开头表示不过滤
*.[ab]    支持通配符：过滤所有以.a或者.b为扩展名的文件
/test  仅仅忽略项目根目录下的 test 文件，不包括 child/test等非根目录的test目录


