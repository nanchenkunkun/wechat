const express=require("express");
const sha1=require("sha1");
const auth=require("./wechat/auth");
const ejs=require("ejs");
const Wechat=require("./wechat/wachat");
const {url}=require("./config");
const app=express();
app.set("views","./views");
app.set("view engine","ejs");
const {getT}=require("./wechat/getEcode");
const wechatApi=new Wechat();
app.get("/getEcode",async function(req,res){

    const url=await getT();
    let s=" ";
    for(let i=0;i<url.length;i++){
        s+=`<img src="${url[i]}" alt="" style="width: 20%;">`;
    }

    res.send(s);
})
app.get("/search",async (req,res)=>{
    const noncestr=Math.random().toString().split(".")[1];
    const timestamp=Date.now();
    const {ticket}=await wechatApi.getTicket();
    const arr=[
        `jsapi_ticket=${ticket}`,
        `noncestr=${noncestr}`,
        `timestamp=${timestamp}`,
        `url=${url}/search`
    ]
    const str=arr.sort().join("&");
    const signature=sha1(str);

    res.render("search",{
        signature,
        noncestr,
        timestamp
    });
});
app.use(auth());

app.listen(3000,()=>console.log("服务器启动成功"));