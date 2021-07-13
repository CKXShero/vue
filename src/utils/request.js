import axios from 'axios'
let instance = axios.create({
    baseURL:'http://localhost:3300'
})
let leanCloud = axios.create({
    baseURL:'https://wrrwbhxv.lc-cn-n1-shared.com',
    //appid  WRrWbHxvOFNpRydNcwuCY7Lb-gzGzoHsz
    // appkey A6aRseUDaUmqGSw7X0EfYiXu
    //master  iNUBQvwWiA6K3X9ah2NTnfqU
    headers:{
        "X-LC-Id": "WRrWbHxvOFNpRydNcwuCY7Lb-gzGzoHsz" ,
        "X-LC-Key": "A6aRseUDaUmqGSw7X0EfYiXu" ,
       "Content-Type": "application/json" 
    }
})
export {instance,leanCloud}