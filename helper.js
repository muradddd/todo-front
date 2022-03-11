export function redirect(endpoint){
    window.location = `${endpoint}.html`
};


export const SITE_URL = 'https://todos-api-rest.herokuapp.com/api/v1';

export const REGISTER_URL = `${SITE_URL}/auth/register`;
export const LOGIN_URL = `${SITE_URL}/auth/login`;

export const TODOS_LIST_URL = `${SITE_URL}/todos/`;


