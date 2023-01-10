function getUrlCode(url){
    let nextList = url.split('?')
    let nextUrl = nextList.length > 0 && nextList[1]
    let paramsList = nextUrl && nextUrl.split('&')
    let code = ''
    Array.isArray(paramsList) && paramsList.map( (v,i) =>{
      let endList = v && v.split('=')
      if(endList.length > 0){
        if(endList[0] == 'code'){
          code = endList[1]
        }
      }
      
    })
    return code
}
function parseUrl(url){
  let nextList = url.split('?')
  let nextUrl = nextList.length > 0 && nextList[1]
  let paramsList = nextUrl && nextUrl.split('&')
  let res = {}
  Array.isArray(paramsList) && paramsList.map( (v,i) =>{
    let endList = v && v.split('=')
    if(endList.length > 0){
      res[endList[0]] = endList[1]
    }
  })
  return res
}
export { getUrlCode,parseUrl } 

