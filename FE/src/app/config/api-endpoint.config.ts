import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT = {
  auth: {
    base: API_BASE_URL,
    login: '/users/login',
  },
  category: {
    base: API_BASE_URL + '/' + 'categories',
    list: '/list',
    add: '/add',
  },
   comment: {
      base: API_BASE_URL + '/admin',
      list: '/comments/list',
      add: '/add',
    },
    // các endpoint khác...
  
  
};