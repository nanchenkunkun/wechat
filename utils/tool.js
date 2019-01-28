const {parseString}=require("xml2js");
const {writeFile,readFile}=require("fs");
const {resolve}=require("path");
module.exports={
    getUserDataAsync(req){
        return new Promise((resolve,reject)=>{
            let xmlData="";
            req.on("data",data=>{
                    xmlData+=data.toString();
                });
            req.on("end",()=>{
                    resolve(xmlData);
                })
        });
    },
    parseXMLAsync(xmlData){
        return new Promise((resolve,reject)=>{
            parseString(xmlData,{trim:true},(err,data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject("something error"+err);
                }
            })
        });

    },
    formatMessage(jsData){
        let message={};
        jsData=jsData.xml;
        if(typeof jsData==="object"){
            for(let key in jsData){
                let value=jsData[key];
                if(Array.isArray(value)&&value.length>0){
                    message[key]=value[0];
                }
            }
        }

        return message;
    },
    writeFileAsync(data,fileName){
        const ticket=JSON.stringify(data);
        const FilePath=resolve(__dirname,fileName);
        return new Promise((resolve,reject)=>{
            writeFile(FilePath,ticket,err=>{
                if(!err){
                    console.log("文件保存成功");
                    resolve(ticket);
                }else{
                    reject("writeFileAsync"+err);
                }
            })
        })
     },
    readFileAsync(fileName){
        const filePath=resolve(__dirname,fileName);
        console.log(filePath);
        return new Promise((resolve,reject)=>{
            readFile(filePath,(err,data)=>{
                if(!err){
                    console.log("文件读取成功");
                    data=JSON.parse(data);
                    console.log(data);
                    resolve(data);
                }
                else{
                    reject("readFileAsync error"+err);
                }
            })
        })
    }
}