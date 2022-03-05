const model = require('../model');

var fn_postUserInfo = async (ctx, next) => {
    let body = ctx.request.body
    const { userId } = body
    let userModel = model.user
    
    let users = await  userModel.findAll({
        where: {
            unionid:userId
        }
    })
    let userInfo = {
        nickname:'',
        sex:'',
        province:'',
        city:'',
        headimgurl:'',
        openid:'',
        unionid:'test'
    }
    if(users.length > 0 ){
        const {  nickname= '', sex= -1, province = '', city = '', headimgurl = '', unionid = 'test' } = users[0]
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
    'POST /taxiapi/postUserInfo': fn_postUserInfo,

};