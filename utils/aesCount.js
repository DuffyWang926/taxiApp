const CryptoJS = require("crypto-js");
let aesCount = (str) =>{
    let key = CryptoJS.enc.Utf8.parse('102907'); //密钥必须是16位，且避免使用保留字符
    let encryptedData  = CryptoJS.AES.encrypt(str, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    let hexData = encryptedData.ciphertext.toString();
    console.log(hexData)
    return hexData

};

//================加密================
 
 
//================解密================
// let encryptedHexStr  = CryptoJS.enc.Hex.parse(hexData);
// let encryptedBase64Str  = CryptoJS.enc.Base64.stringify(encryptedHexStr);
// let decryptedData  = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
// });
// let text = decryptedData.toString(CryptoJS.enc.Utf8);
// console.log(text);


module.exports = aesCount;