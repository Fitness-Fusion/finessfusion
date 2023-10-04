import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const register = async (email, password) => {
    const {data} = await $host.post('api/user/register', {email, password, role: 'user'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const response = await $host.post('api/user/register')
    return response
}