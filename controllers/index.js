const model = require('../model');

const fn_index = async (ctx, next) => {
    let userModel = model.user
    
    // (async () => {
//     var dog = await Pet.create({
//         id: 'd-' + now,
//         name: 'Odie',
//         gender: false,
//         birth: '2008-08-08',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log('created: ' + JSON.stringify(dog));
// })();

    let users = await  userModel.findAll({
        where: {
        }
    })
    console.log(`find ${users} users:`);

    // let users = userModel.findAll({
    //     where: {
    //     }
    // }).then(function (p) {
    //     console.log('created.' + JSON.stringify(p));
    // }).catch(function (err) {
    //     console.log('failed: ' + err);
    // });
    // console.log(`find ${users} users:`);
    
    ctx.response.body = {
        data:users
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
    'GET /': fn_index,
    'POST /signin': fn_signin,
};