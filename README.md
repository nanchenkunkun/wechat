# 沃点餐 微信公众号
##文件介绍
* wechat
    1. config
        1. index.js-----微信配置文件,token,appid等
    2. utils
        1. access_token.txt-----将获取到的access_token，存至本地
        2. api.js-----细分网址
        3. DAO.js-----操作数据库
        4. ticket.txt-----将获取到的js-sdk的ticket存至本地，用于网页开发
        5. tool.js-----放置方法便于直接调用
    3. views
        1. search.ejs-----将数据渲染到客户端
    4. wechat
        1. auth.js-----处理微信数据
        2. getEcode.js-----批量获取场景二维码
        3. menu.js-----配置菜单
        4. reply.js-----处理用户发送的消息和内容，决定返回不同的内容给用户
        5. teamplateData.js-----模板消息设置
        6. template.js-----回复消息的模板
        7. wachat.js-----获取access_token,ticket的方法
    5. app.js-----引入文件
    6. package.json-----npm配置文件
    7. pakage-lock.json-----配置文件
    8. README.md-----项目介绍
    9. token.js-----token验证