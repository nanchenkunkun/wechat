
/*加工处理最终处理用户消息的模板*/
module.exports=options=>{
    let replyMessage=`<xml> 
            <ToUserName><![CDATA[${options.toUserName}]]></ToUserName>
            <FromUserName><![CDATA[${options.formUserName}]]></FromUserName>
            <CreateTime>${options.createTime}</CreateTime>
            <MsgType><![CDATA[${options.msgType}]]></MsgType>`;
    if(options.msgType ==="text"){
        replyMessage+=`
            <Content><![CDATA[${options.content}]]></Content>`;
    }else if(options.msgType ==="image"){
        replyMessage+=`<Image><MediaId><![CDATA[${options.mediaId}]]></MediaId></Image>`;
    }else if(options.msgType ==="voice"){
        replyMessage+=`<Voice><MediaId><[CDATA[${options.mediaId}]]></MediaId></Voice>`;
    }else if(options.msgType ==="video"){
        replyMessage+=`<Video>
            <MediaId><![CDATA[${options.mediaId}]]>/MediaId>
            <Title><![CDATA[${options.title}]]></Title>
            <Description><![CDATA[${options.description}]]></Description>
            </Video>`;
    }else if(options.msgType ==="music"){
        replyMessage+=`<Music>
            <Title><![CDATA[${options.title}]]></Title>
            <Description><![CDATA[${options.description}]]></Description>
            <MusicUrl><![CDATA[${options.musicUrl}]]></MusicUrl>
            <HQMusicUrl><![CDATA[${options.hqMusicUrl}]]></HQMusicUrl>
            <ThumbMediaId><![CDATA[${options.mediaId}]]></ThumbMediaId>
            </Music>`;
    }else if(options.msgType ==="news"){
        // replyMessage+=`<ArticleCount>${options.content}</ArticleCount>
        //     <Articles>`;
        //     options.content.forEach(item=>{
        //             replyMessage+=`<item>
        //              <Title><![CDATA[${item.title}]]></Title>
        //              <Description><![CDATA[${item.description}]]></Description>
        //              <PicUrl><![CDATA[${item.picUrl}]]></PicUrl>
        //              <Url><![CDATA[${item.Url}]]></Url>
        //              </item>`;
        //     });
        //    replyMessage+=`</Articles>`;
        replyMessage+=`
            <ArticleCount>1</ArticleCount>
            <Articles>
              <item>
                 <Title><![CDATA[${options.Title}]]></Title>
                 <Description><![CDATA[${options.Description}]]></Description>
                 <PicUrl><![CDATA[${options.PicUrl}]]></PicUrl>
                 <Url><![CDATA[${options.Url}]]></Url>
              </item>
            </Articles>`;
    }
    replyMessage+="</xml>";
    return replyMessage;

}