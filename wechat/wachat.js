const {writeFile,readFile}=require("fs");
const rp=require("request-promise-native");
const {appID,appsecret}=require("../config");
const api=require("../utils/api");
const menu=require("./menu");
const {writeFileAsync,readFileAsync}=require("../utils/tool");
class Wechat{
    constructor(){}
    getAccessToken(){
        const url=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`;
        return new Promise((resolve,reject)=>{
            rp({method:'GET',url,json:true})
                .then(res=>{
                    res.expires_in=Date.now()+(res.expires_in-300)*1000;
                    resolve(res);
                })
                .catch(err=>{
                    console.log(err);
                    reject("getAccessToken方法出了问题"+err);
                })
        });

    }
    saveAccessToken(accessToken){
        // return new Promise((resolve,reject)=>{
        //     accessToken=JSON.stringify(accessToken);
        //     writeFile("./accessToken.txt",accessToken,err=>{
        //         if(!err){
        //             console.log("文件保存成功");
        //             resolve();
        //         }else{
        //             reject("save Error"+err);
        //         }
        //     })
        // })

        return writeFileAsync(accessToken,"access_token.txt");
    }
    readAccessToken(){
        // return new Promise((resolve,reject)=>{
        //     readFile("./accessToken.txt",(err,data)=>{
        //         if(!err){
        //             console.log("文件读取成功");
        //             data=JSON.parse(data);
        //             resolve(data);
        //         }
        //         else{
        //             reject("readAceesss error"+err);
        //         }
        //     })
        // })
        return  readFileAsync("access_token.txt");
    }
    isValidAccessToken(data){
        if(!data ||!data.access_token || !data.expires_in){
            return false;
        }
        // if(data.expires_in<Date.now()){
        //     return false;
        // }else{
        //     return true;
        // }
        return data.expires_in>Date.now();
    }
    fetchAccessToken() {
        if(this.access_token&&this.expires_in&&this.isValidAccessToken(this)){
            return Promise.resolve({
                access_token:this.access_token,
                expires_in:this.expires_in
            });
        }
        return this.readAccessToken()
            .then(async (res) => {
                if (this.isValidAccessToken(res)) {
                    // resolve(res);
                    return Promise.resolve(res);
                } else {
                    const res = await this.getAccessToken();
                    await saveAccessToken(res);
                    return Promise.resolve(res);
                }
            })
            .catch(async (err) => {
                const res = await this.getAccessToken();
                await this.saveAccessToken(res);
                return Promise.resolve(res);
            })
            .then(res => {
                this.access_token = res.access_token;
                this.expires_in = res.expires_in;
                return Promise.resolve(res);
            })
    }


    getTicket(){
        return new Promise(async (resolve,reject)=>{
            const data=await this.fetchAccessToken();
            const url=`${api.ticket}&access_token=${data.access_token}`;
            rp({method:"GET", url,json:true})
                .then(res=>{
                    console.log(res);
                    resolve({ticket:res.ticket,expires_in:Date.now()+(res.expires_in-300)*1000})
                })
        })

    }
    saveTicket(ticket){
        //
        // return new Promise((resolve,reject)=>{
        //     ticket=JSON.stringify(ticket);
        //     writeFile("./ticket.txt",ticket,err=>{
        //         if(!err){
        //             console.log("文件保存成功");
        //             resolve();
        //         }else{
        //             reject("save Ticket Error"+err);
        //         }
        //     })
        // })
        writeFileAsync(ticket,"ticket.txt");
    }
    readTicket(){
        // return new Promise((resolve,reject)=>{
        //     readFile("./ticket.txt",(err,data)=>{
        //         if(!err){
        //             console.log("文件读取成功");
        //             data=JSON.parse(data);
        //             resolve(data);
        //         }
        //         else{
        //             reject("readTicket error"+err);
        //         }
        //     })
        // })
       return readFileAsync("./ticket.txt");
    }
    isValidTicket(data){
        if(!data ||!data.ticket || !data.expires_in){
            return false;
        }
        return data.expires_in>Date.now();
    }
    fetchTicket() {
        if(this.ticket&&this.ticket_expires_in&&this.isValidTicket(this)){
            return Promise.resolve({
                access_token:this.ticket,
                expires_in:this.ticket_expires_in
            });
        }
        return this.readTicket()
            .then(async (res) => {
                if (this.isValidTicket(res)) {
                    // resolve(res);
                    return Promise.resolve(res);
                } else {
                    const res = await this.getTicket();
                    await saveTicket(res);
                    return Promise.resolve(res);
                }
            })
            .catch(async (err) => {
                const res = await this.getTicket();
                await this.saveTicket(res);
                return Promise.resolve(res);
            })
            .then(res => {
                this.ticket = res.ticket;
                this.expires_in = res.expires_in;
                return Promise.resolve(res);
            })
    }

    createMenu(menu){
        return new Promise(async (resolve,reject)=>{
            try{
                const data=await this.fetchAccessToken();
                const url= `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${data.access_token}`;
                const result=await rp({method:'POST', url, json:true, body:menu});
                resolve(result);
            }catch(e){
                reject("getMynuerror"+e);
            }
        }
        )

    }
    deleteMenu(){
        return new Promise(async (resolve,reject)=>{
            try{
                const data=await this.fetchAccessToken();
                const url=`https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${data.access_token}`;
                const result=await rp({method:"POST",url,json:true});
                resolve(result);
            }catch(e){
                reject("deleteMenu error"+e);
            }
        })
    }
}
module.exports=Wechat;
