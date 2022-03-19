const axios = require('axios');
const model = require('../model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

var fn_login = async (ctx, next) => {
    let body = ctx.request.body
    let { code, upCode } = body
    // code = '0312will2ybAQ84sUTnl2ULBlj02wilP'
    let secret = '1d3b61572a9edbb288b25472f4e1fb60'
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxe52a97ff5cbcfc9a&secret=${secret}&code=${code}&grant_type=authorization_code`
    let response = await axios({
        method: "GET",
        url: url,
    })
    const { data={} } = response
    const {  refresh_token, errcode } = data
    console.log('DATA', data)
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
            let usersAll = await  userModel.findAll({
                where: {},
                order:[['updatedAt', 'DESC']],
                limit:1
            })
            let user = usersAll.length && usersAll[0]
            let { userId } = user
            if(!userId){
                userId = '111'
            }
            let userIdNow = userId + 1
            let userCodeNow = ''
            if( upCode ){
                let codeList = upCode.split('a')
                if(codeList.length > 2){
                    userCodeNow = codeList[1] + 'a' + userIdNow + 'a'
    
                }
            }else{
                userCodeNow = '111a' + userIdNow + 'a'
            }

            userInfo = {
                userId:userIdNow,
                userCode:userCodeNow,
                nickname,
                sex,
                province,
                city,
                headimgurl,
                openid,
                unionid
            }

            let nextUser = {
                userId,
                userCode:userCodeNow,
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
        }else{
            const { userId, userCode} = users.length && users[0]
            userInfo = {
                userId,
                userCode,
                nickname,
                sex,
                province,
                city,
                headimgurl,
                openid,
                unionid
            }

        }
        
        
    }
    ctx.response.body = {
                            code:200,
                            data:{
                                userInfo
                            }
                        }
    
    
};

// const fn_basicLogin = async (ctx, next) => {
//     let body = ctx.request.body
//     let { code, upCode } = body
//     code = '0312will2ybAQ84sUTnl2ULBlj02wilP'
//     let secret = '1d3b61572a9edbb288b25472f4e1fb60'
//     https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx520c15f417810387&redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60&response_type=code&scope=snsapi_base&state=123#wechat_redirect
//     let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxe52a97ff5cbcfc9a&secret=${secret}&code=${code}&grant_type=authorization_code`
//     let response = await axios({
//         method: "GET",
//         url: url,
//     })
//     const { data={} } = response
//     const {  refresh_token, errcode } = data
//     console.log('DATA', data)
//     let userInfo =  { 
//                         nickname: '',
//                         sex:-1,
//                         province:'',
//                         city:'',
//                         headimgurl:'',
//                         openid:'',
//                         unionid:'test'
//                     }
//     ctx.response.body = {
//         code:200,
//         data:{
//             userInfo
//         }
//     }


// }
module.exports = {
    'POST /taxiapi/login': fn_login,
    'GET /taxiapi/login': fn_login,
    // 'GET /taxiapi/basiclogin': fn_basicLogin,
};