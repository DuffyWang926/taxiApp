const model = require('../model');

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
            imgUrl:v.url,
            title:v.title,
            author:v.author,
            downSum:v.sum
        }
        return res
    })
    let dataRes = [
        {
            title:'热门',
            imgList
        }
    ]
    ctx.response.body = {
        data:dataRes
    }
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
};