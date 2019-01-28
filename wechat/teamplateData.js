const rp=require("request-promise-native");
const Wechat=require("./wachat");
async function setIndustry(){
    const {access_token}=await new Wechat().fetchAccessToken();
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
    const {access_token}=await new Wechat().fetchAccessToken();
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
    const {access_token}=await new Wechat().getAccessToken();
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
    const {access_token}=await new Wechat().getAccessToken();
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
    const {access_token}=await new Wechat().getAccessToken();
    const data={
         "touser":"olQMj5jre3i5DWSTNRv2JfUuq94A",
          template_id: 'K3iPNAmkssg5kw4n1estG32fCdOXqt75BlQi74JEf4c',
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
sendT().then(res=>{
    console.log(res);
})
