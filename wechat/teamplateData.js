const rp=require("request-promise-native");
const getAccess=require("./wachat");
async function setIndustry(){
    const {access_token}=await new getAccess().fetchAccessToken();
    console.log(access_token);
    const url=`https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=${access_token}`;
    const data={
        "industry_id1":"1",
        "industry_id2":"10"
    }
    return new Promise((resolve,reject)=>{
        rp({method:'POST',url,json:data})
            .then(res=>{
                resolve(res);

            })
            .catch(err=>{
                reject(err);
            })
    })
}
async function getIndustry(){
    const {access_token}=await new getAccess().fetchAccessToken();
    console.log(access_token);
    const url=`https://api.weixin.qq.com/cgi-bin/template/get_industry?access_token=${access_token}`;
    return new Promise((resolve,reject)=>{
        rp({method:'GET',url,json:true})
            .then(res=>{
                resolve(res);

            })
            .catch(err=>{
                reject(err);
            })
    })
}
async function getTId(){
    const {access_token}=await new getAccess().getAccessToken();
    const data={
        "template_id_short":"TM00015"
    };
    console.log(access_token);
    const url=`https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=${access_token}`;
    return new Promise((resolve,reject)=>{
        rp({method:'POST',url,json:data})
            .then(res=>{
                resolve(res);

            })
            .catch(err=>{
                reject(err);
            })
    })
}
async function getList(){
    const {access_token}=await new getAccess().getAccessToken();
    console.log(access_token);
    const url=`https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=${access_token}`;
    return new Promise((resolve,reject)=>{
        rp({method:'GET',url,json:true})
            .then(res=>{
                resolve(res);

            })
            .catch(err=>{
                reject(err);
            })
    })
}
async function sendT(){
    const {access_token}=await new getAccess().getAccessToken();
    const data={
         "touser":"ofJQl1kZ9matLZizWoiSrux95G7o",
          template_id: 'f1MMhojOTG7CoKaxBCmBeEpXyk6IQRdITy-CnJCaPWU',
        "data":{
            "first": {
                "value":"恭喜你购买成功！",
                "color":"#173177"
            },
            "product":{
                "value":"巧克力",
                "color":"#173177"
            },
            "amount": {
                "value":"39.8元",
                "color":"#173177"
            },
            "time": {
                "value":"2014年9月22日",
                "color":"#173177"
            },
            "remark":{
                "value":"欢迎再次购买！",
                "color":"#173177"
            }
        }
    }
    console.log(access_token);
    const url=`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`;
    return new Promise((resolve,reject)=>{
        rp({method:'POST',url,json:data})
            .then(res=>{
                resolve(res);

            })
            .catch(err=>{
                reject(err);
            })
    })
}
// setIndustry().then(res=>{
//     console.log(res);
// })
// getIndustry().then(res=>{
//     console.log(res);
// })

// getTId().then(res=>{
//     console.log(res);
// })
//gjFaXqOwNNKWdPyBAmSopbZzm_9WDrzARBBBnDetrbY
// getList().then(res=>{
//     console.log(res);
// })
sendT().then(res=>{
    console.log(res);
})
