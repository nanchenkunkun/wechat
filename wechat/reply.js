const dao=require("../utils/DAO");
module.exports=async (message)=>{
    //图文消息模板
    let optionNews={
        toUserName:message.FromUserName,
        formUserName:message.ToUserName,
        createTime:Date.now(),
        msgType:"news",
        ArticleCount:1,
        Articles:"这是一个测试",
        Title:"这是一个点餐系统",
        Description:"戳我点餐",
        PicUrl:"http://img03.tooopen.com/uploadfile/downs/images/20110714/sy_20110714135215645030.jpg"

    };
    //文本消息模板
    let optionText={
        toUserName:message.FromUserName,
        formUserName:message.ToUserName,
        createTime:Date.now(),
        msgType:"text"
    };
    let content="系统开发中！！";
    if(message.MsgType==="text"){
        if(message.Content==="1"){
            content="系统开发中！！";
        }else if(message.Content==="2"){
            content="系统开发中！！";
        }else if(message.Content.match("爱")){
            content="系统开发中！！";
        }
    }else if(message.MsgType === "image"){
        optionText.msgType="image";
        optionText.mediaId=message.MediaId;
        console.log(message.PicUrl);
    }else if(message.MsgType ==="voice"){
        optionText.msgType="voice";
        optionText.mediaId=message.MediaId;
        console.log(message.Recognition);
    }else if(message.MsgType==="location"){
        optionText.msgType="location";
        content=`维度,${message.Location_X}经度:${message.LocatoinY} 缩放:${message.Scale} 微信信息,${message.Lable}`;
        console.log(content);
    }else if(message.MsgType==="event"){
        if(message.Event==="subscribe"){
            content="welcome your focus";
            if(message.EventKey){
                // content="用户扫描带参数二维码关注事件";
                let arr=message.EventKey.split("_");
                optionNews.Url=`http://dc.zzz001.com/diancan02/index.php?dianpu_id=${arr[4]}&table_num=${arr[5]}`;
                optionNews.Description="戳我点餐  桌号:"+`${arr[5]}`;
                const res=await dao(`SELECT dianpu_name from dc_dianpu WHERE dianpu_id=${arr[4]}`);

                optionNews.Title=res[0].dianpu_name;
                console.log(optionNews);
                return optionNews;
            }
        }else if(message.Event==="unsubscribe"){
            console.log("wuqingquguang");
        }else if(message.Event==="SCAN"){
            // content="用户已经关注二维码关注事件";
            let arr=message.EventKey.split("_");
            optionNews.Url=`http://dc.zzz001.com/diancan02/index.php?dianpu_id=${arr[4]}&table_num=${arr[4]}`;
            optionNews.Description="戳我点餐  桌号:"+`${arr[4]}`;
            const res=await dao(`SELECT dianpu_name from dc_dianpu WHERE dianpu_id=${arr[3]}`);
            optionNews.Title=res[0].dianpu_name;
            return optionNews;
        }

        else if(message.Event==="CLICK"){
            content=`您点击了按钮${EventKey}`;
        }
    }
    optionText.content=content;
    return optionText;
}