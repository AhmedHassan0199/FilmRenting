import axios from 'axios'

export const register = newUser => {
    return axios.post('users/register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        username: newUser.username,
        password: newUser.password,
        phone_number: newUser.phone_number
    }).then(res => {
        console.log("Done Registeration")
    })

}

export const login = user => {
    return axios.post('/users/login',{
        username:user.username,
        password:user.password
    }).then(res=>{
        localStorage.setItem('usertoken',res.data)
        return res.data
    }).catch(err=>{
        console.log("error :" +err)
    })


}