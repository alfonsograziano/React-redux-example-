import Cookies from 'universal-cookie';

const cookies = new Cookies();
const authCookie = "AuthToken"

export const setToken = (token) => cookies.set(authCookie, token)
export const getToken = () => cookies.get(authCookie)
export const logOut = () => { cookies.remove(authCookie) }
