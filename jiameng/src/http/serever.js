import axios from  "axios"

// 配置API的统一接口地址
const URL = process.env.API_ROOT

const http = axios.create({
  baseURL:URL,
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

export default{
  get(url,params){
     return new Promise(
       async(resolve,reject)=>{
         const data = await http.get(url,{params});
         const code = Number(data.data.code);
         const desc = data.data.desc;
         if(code != 1){
           if(desc == "用户不存在"){
             //进入登录页面
           }
         }else{
           resolve(data.data.data);
         }
       }
     )
  }
}