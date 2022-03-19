const axios = require('axios');
const model = require('../model');

const login = async (ctx, next) => {
    let url = `https://alliance.yunzhanxinxi.com/login`
    let usrName = '15321830653'
    let passWord = '6afe2db279dc446f563b0a13296c6334'
    let response = await axios({
        method: "POST",
        url: url,
        data:{
            usrName,
            passWord

        }
    })
    const { code, data, message, headers} = response
    console.log('headers',headers)
    const cookie = headers['set-cookie']
    let result = {
        code,
        data,
        message,
        cookie
    }

    return result

} 
const searchDataFn = async (ctx, next) => {
    let userInfo = await login()
    const { cookie } = userInfo
    let isNext = true
    let page = 1
    while(isNext){
        let dataParam = {
            page,
            platform:'', 
            orderStatus:'', 
            settleStartTime:'', 
            settleEndTime:'', 
            orderNo:'',
            payStartTime:'2022-03-13 00:00:00',
            payEndTime:'2022-03-19 23:59:59',
            promotionId:'',
            allianceAffiliation:'',
            rebateType:'',
            commissionType:'',
        }
        let flag = await getList({dataParam, cookie})
        isNext = flag
        page += 1
    }

    ctx.response.body = {
                            code:200,
                            data:{
                                
                            }
                        }
    
    
};

async function getList({param,cookie}){
    let detailUrl = 'https://alliance.yunzhanxinxi.com/order/list/index'
    let response = {}
    response= await axios({
        method: "POST",
        url: detailUrl,
        data:param,
        headers:{
            Cookie:cookie
        }
    })
    let responseData = response.data
    const { code, data } = responseData
    let tableData = data
    let tableList = []
    let isNext = false
    if(code == 200){
        const { total, pageCount, pageSize, page, data } =tableData
        tableList = data || []
        console.log('tableList',tableList)
        tableList.forEach(v =>{
            saveOrder(v)
        })
        if(total > (pageSize * page)){
            isNext = true 
        }
    }
    return isNext


}

async function saveOrder(data){
    try{
        const { 
            estimate_amount,
            id,
            order_no,
            order_status,
            paid_time,
            promotion_id,
            settle_amount,
            settle_time,
        } = data
        const ordersModel = model.orders
        let exitOrders = await  ordersModel.findAll({
            where: {
                id:order_no
            }
        })
        if(exitOrders && exitOrders.length < 1){
            console.log('exitOrders start')
            let orderInt = 0
            console.log('exitOrders start')
            if(order_status === "订单结算"){
                orderInt = 1
            }else{
                orderInt = 2
            }
            console.log('settle_time',settle_time)
            const settleTime = parseInt(new Date(settle_time).getTime()/1000+'')
            const paidTime = parseInt(new Date(paid_time).getTime()/1000+'')
            console.log('paidTime start', paidTime)
            const newOrder ={
                id:order_no,
                orderNo:order_no,
                orderStatus: orderInt,
                paidTime,
                orederId:id,
                promotionId:promotion_id,
                settleTime,
                estimateAmount:estimate_amount,
                settleAmount:settle_amount,
            }
            console.log('newOrder', newOrder)
            await ordersModel.create(newOrder)
        }
    }catch{
        console.log('error')
    }
    

}

module.exports = {
    'GET /taxiapi/searchData': searchDataFn,
};