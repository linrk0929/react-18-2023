//和用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit'
import { http } from '@/utils'
import { setToken as _setToken,getToken } from '@/utils'
 const userStore = createSlice({
     name: 'user',
     initialState: {
         token:getToken()||''
     },
     reducers: {
         setToken(state,action) {
             state.token = action.payload
           _setToken(state.token)
         }
     }
 })

const { setToken } = userStore.actions
// 获取reducer函数
const userReducer = userStore.reducer

const fetchLogin = (loginForm) => { 
    return async (dispatch) => { 
        const res = await http.post('/authorizations', loginForm)
        dispatch(setToken(res.data.token))
    }
}

export { fetchLogin,setToken }

export default userReducer

