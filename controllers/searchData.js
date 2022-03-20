const axios = require('axios');
const model = require('../model');
const {formatLimit} = require('../utils/formatDate')


const searchDataFn = async (ctx, next) => {
    let userInfo = await login()
    const { cookie } = userInfo

    let userOrdersModel = model.userOrders
    let userOrders = await userOrdersModel.findAll({
        where:{
            isCheck:0
        },
        order:[['clickTime', 'ASC']],
    })
    console.log('userOrders', userOrders)
    let orderList = []
    if(userOrders && userOrders.length){
        userOrders.forEach( async v =>{
            let beginTime = v && v.clickTime
            let beginTimeFormat = formatLimit(beginTime)
            let orderDaysModel = model.orderDays
            let beginDay = await orderDaysModel.findAll({
                where:{
                    orderDay:beginTimeFormat
                }
            })
            if(beginDay && beginDay.length == 0){
                let newOrderDay = {
                    id:beginTimeFormat,
                    orderDay:beginTimeFormat,
                    isCheck:0,
                }

                await orderDaysModel.create(newOrderDay)
            }else{
                let isCheck = beginDay[0]
                if(isCheck == 0){
                    orderList = await checkDayOrder(beginTime,cookie)
                    computeAmount(v, orderList)
                }
            }


        })
        
    }
    

    ctx.response.body = {
                            code:200,
                            data:{
                                
                            }
                        }
    
    
};

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
    const cookie = headers['set-cookie']
    let result = {
        code,
        data,
        message,
        cookie
    }

    return result

} 

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
    console.log('responseData',responseData)

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
    return { isNext, tableList}


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

async function checkDayOrder(beginTime,cookie){
    let orderList = []
    let isNextFlag = true
    let page = 1 

    let now = parseInt(new Date().getTime()/1000)
    let beginDay = formatLimit(beginTime)
    let nowDay = formatLimit(now)
    if(nowDay != beginDay){
        console.log('beginDay', beginDay)
        let payStartTime = formatLimit(beginTime) + '00:00:00'
        let payEndTime = formatLimit(beginTime) + '23:59:59'
        console.log('payStartTime', payStartTime, payEndTime)

        while(isNextFlag){
            let dataParam = {
                page,
                platform:'', 
                orderStatus:'', 
                settleStartTime:'', 
                settleEndTime:'', 
                orderNo:'',
                payStartTime,
                payEndTime,
                promotionId:'',
                allianceAffiliation:'',
                rebateType:'',
                commissionType:'',
            }
            let response = await getList({dataParam, cookie})
            const { isNext, tableList } =response
            orderList = orderList.concat(tableList)
            isNextFlag = isNext
            page += 1
        }

    
    }
    return orderList
    
}

async function computeAmount(userOrder, orderList){
    const { clickTime, userId } = userOrder
    orderList.sort( (a,b) =>{
        return a.paid_time - b.paid_time
    })
    let isCheck = false
    orderList.forEach( async v =>{
        const { paid_time, settle_amount } = v
        let paidTime = new Date(paid_time).getTime()
        let timeDiff = parseInt((paidTime - clickTime)/1000/60)
        if(timeDiff < 10){
            isCheck = true
            let userAccountsModel = model.userAccounts
            let userAccounts = userAccountsModel.findAll({
                where:{
                    userId
                }
            })
            if(userAccounts && userAccounts.length == 0){
                let userAccount = userAccounts[0]
                const { amount } = userAccount
                let usersModel = model.users
                let users = await usersModel.findAll({
                    userId
                })
                if(users && users.length > 0){
                    const { upId } = userId[0]
                    let newAccount = {
                        id:userId,
                        userId:userId,
                        upId,
                        amount:settle_amount,
                    }
                    userAccountsModel.create(newAccount)
                }
                
            }else{
                let nextAmount = +amount + settle_amount + ''
                userAccount.amount = nextAmount
                await userAccountsModel.update(userAccount)
            }

        }
    })
    return isCheck

}
module.exports = {
    'GET /taxiapi/searchData': searchDataFn,
};