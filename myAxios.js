
(function(window){

  function axios({
    url,
    params={},
    method='GET',
    data={}
    }){
    return new Promise((res,rej)=>{

      //创建一个xhr实例
      const xhr=new XMLHttpRequest()

      xhr.onreadystatechange=function (){
        const {readyState,status,response,statusText}=xhr
       if(readyState!==4)  return

        if (status>=200&& status<300){
        res({data:JSON.parse(response)})
        }else{
          rej(statusText)
        }
      }


      if(params){
        Object.keys(params).forEach((item,index)=>{
          url+=index===0?`?${item}=${params[item]}`:`&${item}=${params[item]}`
        })
      }

      console.log(url)
      xhr.open(method,url,true)


      if(method.toUpperCase()==='POST'||"PUT"){
        xhr.send(JSON.stringify(data))
      }else{
        xhr.send(null)
      }

    })
  }
  window.axios=axios

})(window)