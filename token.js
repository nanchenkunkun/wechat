const express=require("express");
const sha1=require("sha1");
const app=express();
const config={
    token:"kunkun",
    appID:"wx716b14f05c3231b6",
    appsecret:"3ebf22de3ecd9d6987d2a1fbb4355d8c"
}
app.use((req,res,next)=>{
    console.log(req.query);
    const {signature,echostr,timestamp,nonce}=req.query;
    const {token}=config;
    const arr=[timestamp,nonce,token];
    const arrSort=arr.sort();
    // console.log(arr);
    const str=arr.join('');
    // console.log(str);
    const sha1Str=sha1(str);
    // console.log(sha1Str);
    if(sha1Str==signature){
        res.send(echostr);
    }else{
        res.end("error");
    }


})
app.listen(3000,()=>console.log("服务器启动成功"));