const sha1=require("sha1");
const config=require("../config");
const {getUserDataAsync,parseXMLAsync,formatMessage}=require("../utils/tool");
const template=require("./template");
const reply=require("./reply");
module.exports=()=>{
    return async (req,res,next)=>{
        const {signature,echostr,timestamp,nonce}=req.query;
        const {token}=config;
        const sha1Str=sha1([timestamp,nonce,token].sort().join(""));
        if(req.method==="GET"){
            if(sha1Str==signature){
                res.send(echostr);
            }else{
                res.end("error");
            }
        }else if (req.method==="POST") {
                if(sha1Str!==signature){
                    res.end("error");
                }

        //接受请求体重的数据，流式数据

        const xmlData=await getUserDataAsync(req);

        //将xml数据解析为js对象

        const jsData=await parseXMLAsync(xmlData);

        //格式化数据

        const message=formatMessage(jsData);

        //回复模板

        const options=await reply(message);

        //最终回复用户的消息

        const replyMessage=template(options);

        //返回给微信服务器

        res.send(replyMessage);
        }else{
            res.send("error");
        }

    }
}
