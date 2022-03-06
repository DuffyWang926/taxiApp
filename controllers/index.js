const axios = require('axios');
const model = require('../model');

var fn_login = async (ctx, next) => {
    let body = ctx.request.body
    const { code } = body
    // let code = '031YPZZv3KK56Y2sxc3w3IiOwI3YPZZH'
    let secret = '1d3b61572a9edbb288b25472f4e1fb60'
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxe52a97ff5cbcfc9a&secret=${secret}&code=${code}&grant_type=authorization_code`
    console.log('code',url)
    let response = await axios({
        method: "GET",
        url: url,
    })
    const { data={} } = response
    const {  refresh_token, errcode } = data
     console.log(response, 'response')
     console.log(data, 'data')
    
    let userInfo =  { 
                        nickname: '',
                        sex:-1,
                        province:'',
                        city:'',
                        headimgurl:'',
                        openid:'',
                        unionid:'test'
                    }
    if(!errcode){
        let refreshUrl = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wxe52a97ff5cbcfc9a&grant_type=refresh_token&refresh_token=${refresh_token}`
        let refreshRes = await axios({
            method: "GET",
            url: refreshUrl,
        })
        const refreshData = refreshRes.data || {}
        const { access_token,  openid = '' } = refreshData
        let userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
        let userInfoRes = await axios({
            method: "GET",
            url: userInfoUrl,
        })
        let userInfoData = userInfoRes.data || {}
        const {  nickname= '', sex= -1, province = '', city = '', headimgurl = '', unionid = 'test' } = userInfoData
        let userModel = model.user
        let now = new Date().getTime() + ''
        let users = await  userModel.findAll({
            where: {
                openid
            }
        })
        if(users.length <= 0 && openid){
            let nextUser = {
                nickname,
                sex,
                province,
                city,
                headimgurl,
                openid,
                unionid,
                createdAt: now,
                updatedAt: now,
                version:1.0
            }
            await  userModel.create(nextUser)
        }
        console.log('userInfoData',JSON.stringify(userInfoData))
        userInfo = {
            nickname,
            sex,
            province,
            city,
            headimgurl,
            openid,
            unionid
        }
        
    }
    console.log('userInfo',JSON.stringify(userInfo))
    ctx.response.body = {
                        code:200,
                        data:{
                            userInfo
                        }
                    }
    
    
};



module.exports = {
    'POST /taxiapi/login': fn_login,
    'GET /taxiapi/login': fn_login,
};