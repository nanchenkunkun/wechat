//根据店铺id和桌数获取拼接后的ticket网址，从而直接得到二维码

const rp=require("request-promise-native");
var urlencode = require('urlencode');
const {access_token}=require("../config/");
const {writeFile,readFile}=require("fs");
const getAccess=require("./wachat");
async function getTicket(i,j){
    const access_token=await new getAccess().fetchAccessToken();
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
async function getT(dianpu_id,table_num){
    let arr=[];
    for(let j=1;j<=table_num;j++){
        const ticket=await getTicket(dianpu_id,j);
        let url=`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${urlencode(ticket["ticket"])}`;
        arr.push(url);
    }
    return arr;
}
exports.getT=getT;