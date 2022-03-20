const db = require('../db');

module.exports = db.defineModel('userOrders', {
    id:db.STRING(40),
    userId:db.STRING(10),
    clickTime: db.STRING(40),
    isCheck:db.BIGINT(2)
});


// create table userOrders (
//     id varchar(10) not null,
//     userId varchar(10) not null,
//     clickTime varchar(40),
//     isCheck bigint,
//     primary key (id)
// ) engine=innodb;

let test =                                
{
    id:'0',
    nickname:'test',
    sex:1,
    province:'test',
    city:'test',
    headimgurl:'test',
    openid:'test',
    unionid:'test',
    createdAt:'test',
    updatedAt:'test',
    version:1.0
}