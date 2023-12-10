//
const TOKENKEY = 'token_key'

function setToken(token) { 
    return localStorage.getItem(TOKENKEY,token)
}

function getToken() { 
    return localStorage.getItem(TOKENKEY)
}

function clearToken() { 
     localStorage.removeItem(TOKENKEY)
}

export { 
    setToken,
    getToken,
    clearToken
}