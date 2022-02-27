const https = require('https');
const axios = require('axios');



async function testPOST() {
    
}
var fn_login = async (ctx, next) => {
    let body = ctx.request.body
    // const { code } = body
    let code = '041bm9ll2b5LI84l1Yol2zNn1a2bm9l3'
    let secret = '1d3b61572a9edbb288b25472f4e1fb60'
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxe52a97ff5cbcfc9a&secret=${secret}&code=${code}&grant_type=authorization_code`
    console.log('code',url)
    let response = await axios({
        method: "GET",
        url: url,
    })
    const { data={} } = response
    const {  refresh_token } = data
     console.log(response) 
     console.log(data, 'data')
    let refreshUrl = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wxe52a97ff5cbcfc9a&grant_type=refresh_token&refresh_token=${refresh_token}`
    let refreshRes = await axios({
        method: "GET",
        url: refreshUrl,
    })
    const refreshData = refreshRes.data || {}
    const { access_token,  openid } = refreshData
    let userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
    let userInfoRes = await axios({
        method: "GET",
        url: userInfoUrl,
    })
    const userInfoData = userInfoRes.data || {}
    const {  nickname, sex, province, city, headimgurl, unionid } = userInfoData
    console.log(nickname)
    ctx.response.body = {
                        code:200,
                        data:{
                            
                        }
                    }
    
    
};



module.exports = {
    'POST /taxiapi/login': fn_login,
    // 'GET /taxiapi/login': fn_login,
};