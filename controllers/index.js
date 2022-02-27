const https = require('https');



var fn_login = async (ctx, next) => {
    let body = ctx.request.body
    const { code } = body
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxe52a97ff5cbcfc9a&secret=SECRET&code=${code}&grant_type=authorization_code`
    console.log('code',url)
    https.get(url, (resp) => {
        const { access_token, refresh_token, openid } = resp
        let refreshUrl = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wxe52a97ff5cbcfc9a&grant_type=refresh_token&refresh_token=${refresh_token}`
        console.log('refreshUrl',refreshUrl)
        https.get(refreshUrl, (resp) => {
            const { access_token, refresh_token, openid } = resp
            let userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
            console.log('userInfoUrl',userInfoUrl)
            https.get(userInfoUrl, (resp) => {
                const { openid, nickname, sex, province, city, headimgurl, unionid } = resp
                console.log('nickname',nickname)
                ctx.response.body = {
                    code:200,
                    data:{
                        unionid
                    }
                }
               
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
           
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
       
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    
    
};



module.exports = {
    'POST /taxiapi/login': fn_login,
};