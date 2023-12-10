//和用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit'
import { clearToken } from '@/utils'
import { setToken as _setToken, getToken } from '@/utils'
import { loginAPI, getProfileAPI } from '@/apis/user'

 const userStore = createSlice({
     name: 'user',
     initialState: {
         token: getToken() || '',
         userInfo: {}
     },
     reducers: {
         setToken(state,action) {
             state.token = action.payload
           _setToken(action.payload)
         },
         setUserInfo(state,action) { 
          state.userInfo = action.payload   
       },
       clearUserInfo(state) { 
         state.token = ''
         state.userInfo = {}
         clearToken()
       }
     }
 })

const { setToken, setUserInfo,clearUserInfo } = userStore.actions
// 获取reducer函数
const userReducer = userStore.reducer

const fetchLogin = (loginForm) => { 
    return async (dispatch) => { 
        const res = await loginAPI(loginForm)
        dispatch(setToken(res.data.token))
    }
}

const fetchUserInfo = () => {
    return async (dispatch) => {
      const res = await getProfileAPI()
      dispatch(setUserInfo(res.data))
    }
  }

export { setToken, setUserInfo,clearUserInfo }
export { fetchLogin,fetchUserInfo }

export default userReducer

