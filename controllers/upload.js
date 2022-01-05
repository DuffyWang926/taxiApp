const fs = require('fs')
var fn_upload = async (ctx, next) => {
   console.log(ctx.request.body)
   let body = ctx.request.body
   const { type, name, theme} = body
   let fileBuffer = ctx.file.buffer
   console.log(ctx.file);
   let code = 200
   let filePath = '../imgs/' + name + '.gif'

   fs.writeFile(filePath, fileBuffer, function(err) {
    if (err) {
        throw err;
    }
    // 写入成功后读取测试
    
});






   
    ctx.response.body = {
        code,
    }

};

module.exports = {
    'POST /upload': fn_upload
};