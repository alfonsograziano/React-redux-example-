import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getToken = () => cookies.get('dateReminder-AuthToken')
export const logOut = () => { cookies.remove("dateReminder-AuthToken") }
