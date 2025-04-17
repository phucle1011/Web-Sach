import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT = {
  auth: {
    base: API_BASE_URL,
    login: '/login',
  },
  order: {
    base: API_BASE_URL + '/admin' + '/' + 'orders',
    list: '/list',
    add: '/add',
  },
  category: {
    base: `${API_BASE_URL}/admin/categories`,
    list: '/list',
    add: '/add',
    update: '',
    delete: '',
    getById: '',
  },
  product: {
    base: `${API_BASE_URL}/admin/products`,
    list: '/list',
    add: '/add',
    update: '',
    delete: '',
    getById: '',
  },
  productClient:{
    base: API_BASE_URL,
    list: '/product',
  },
  categoryClient:{
    base:API_BASE_URL,
    list: '/category',
  },
  user: {
    base: `${API_BASE_URL}/admin/users`,
    list: '/list',
    add: '/add',
  },
  comment: {
    base: API_BASE_URL +'/admin'+ '/' + 'comments',
    list: '/list',
    add: '/add',
  }
};