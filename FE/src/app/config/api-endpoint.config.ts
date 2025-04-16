import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT = {
  auth: {
    base: API_BASE_URL,
    login: '/login',
  },
  order: {
    base: API_BASE_URL +'/admin'+ '/' + 'orders',
    list: '/list',
    add: '/add',
  }
};