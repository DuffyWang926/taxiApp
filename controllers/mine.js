const QRCode = require('qrcode') 
const model = require('../model');

const codeImgFn = async (ctx, next) => {
    let imgData = ''
    let body = ctx.request.body
    let { url } = body
    imgData = await QRCode.toDataURL(url)
    
    ctx.response.body = {
                            code:200,
                            data:{
                                imgData
                            }
                        }
};

const fnRecordTime = async (ctx, next) => {
    let body = ctx.request.body
    let { userId, clickTime} = body

    let userOrdersModel = model.userOrders
    let userOrder = {
        id:clickTime,
        userId,
        clickTime,
        isCheck:0
    }

    let response = await userOrdersModel.create(userOrder)
    
    ctx.response.body = {
                            code:200,
                            data:{
                                
                            }
                        }
};

module.exports = {
    'POST /taxiapi/codeImg': codeImgFn,
    'POST /taxiapi/recordTime': fnRecordTime,
};