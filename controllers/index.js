const model = require('../model');
const _ = require('lodash')

const fn_banner = async (ctx, next) => {
    let productModel = model.user

    let users = await  productModel.findAll({
        where: {
        }
    })
    console.log(`find ${users} users:`);
    
    ctx.response.body = {
        bannerList:users
    }
};

const fn_home = async (ctx, next) => {
    let productModel = model.product

    let products = await  productModel.findAll({
        where: {
        }
    })
    console.log(`find ${products} products:`);
    let imgList = Array.isArray(products) && products.map( (v,i) =>{
        let res = {
            imgId:v.id,
            imgUrl:v.imgUrl,
            title:v.title,
            author:v.author,
            downSum:v.sum,
            updatedAt:v.updatedAt
        }
        return res
    })
    imgList.sort((a,b) =>{
        return a.downSum - b.downSum
    })
    let imgListEnd = imgList.slice(0,3)
    let nextList = _.cloneDeep(imgList)
    nextList.sort((a,b) =>{
        return a.updatedAt - b.updatedAt
    })
    let newList = nextList.slice(0,3)
    console.log(imgList)
    console.log(nextList)
    let dataRes = [
        {
            title:'热门',
            type:1,
            imgList:imgListEnd
        },
        {
            title:'最新',
            type:2,
            imgList:newList
        },
    ]
    ctx.response.body = dataRes
    
};



var fn_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};



module.exports = {
    'GET /home': fn_home,
    'GET /banner': fn_banner,
    'POST /signin': fn_signin,
    // 'GET /product': fn_home
};