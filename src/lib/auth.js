const USERS_KEY = 'latihan_users'
const AUTH_KEY = 'latihan_auth'

export function getUsers(){
  try{
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  }catch(e){
    return []
  }
}

export function saveUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function addUser({username, password}){
  const users = getUsers()
  users.push({ username, password })
  saveUsers(users)
}

export function findUser(username){
  return getUsers().find(u => u.username === username)
}

export function setCurrentUser(user){
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
}

export function getCurrentUser(){
  try{
    const val = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null')
    if(!val && (import.meta.env && import.meta.env.DEV)){
      // In development mode, provide a default dev user for easier QA
      const dev = { username: 'dev' }
      localStorage.setItem(AUTH_KEY, JSON.stringify(dev))
      return dev
    }
    return val
  }catch(e){
    return null
  }
}

export function logout(){
  localStorage.removeItem(AUTH_KEY)
}


export function isAuthenticated(){
  return !!getCurrentUser()
}

