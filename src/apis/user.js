import { http } from "@/utils";

 //登录请求
export function loginAPI(data) { 
  return  http({
        url: '/authorizations',
        method: 'Post',
        data:data
    })
}

//获取用户信息


export function getProfileAPI() { 
    return http({
        url: 'user/profile',
        method:'GET'
    })
}


