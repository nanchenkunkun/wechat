const rp=require("request-promise-native");
var urlencode = require('urlencode');
const {access_token}=require("../config/");
const {writeFile,readFile}=require("fs");
const getAccess=require("./wachat");
async function getTicket(i,j){
    const access_token=await new getAccess().fetchAccessToken();
    console.log(access_token["access_token"]);
    const jsonData={"action_name": "QR_LIMIT_STR_SCENE", "action_info": {"scene": {"scene_str": `01_fz_dc_${i}_${j}`}}};
    const url=`https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${access_token["access_token"]}`;
    return new Promise((resolve,reject)=>{
        rp({method:'POST',url,json:jsonData})
            .then(res=>{
                resolve(res);
            })
            .catch(err=>{
                console.log(err);
                reject("getAccessToken方法出了问题"+err);
            })
    });
}
async function getT(){
    let arr=[];
    for(let j=1;j<17;j++){
        const ticket=await getTicket(15,j);
        let url=`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${urlencode(ticket["ticket"])}`;
        arr.push(url);
    }
    return arr;
}
exports.getT=getT;