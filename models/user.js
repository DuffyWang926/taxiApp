const db = require('../db');

module.exports = db.defineModel('users', {
    id: db.STRING(10),
    userId: db.STRING(50),
    name: db.STRING(10),
    gender: db.BOOLEAN,
    birth: db.STRING(10),
    createdAt: db.STRING(40),
    updatedAt: db.STRING(40),
    version: db.STRING(10),
});

// create table users (
//     id varchar(50) not null,
//     userId varchar(50) not null,
//     name varchar(10),
//     gender bool,
//     birth varchar(10),
//     createdAt varchar(10),
//     updatedAt varchar(10),
//     version bigint,
//     primary key (id)
// ) engine=innodb;

// {
//     id: '0',
//     userId:'sadf',
//     name: 'Odie',
//     gender: false,
//     birth: '2008-08-08',
//     createdAt: now,
//     updatedAt: now,
//     version: 0
// }