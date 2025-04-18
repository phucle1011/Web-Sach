import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT = {
  cart: {
    base: API_BASE_URL,
    list: '/cart',
    add: '/addcart',
    delete:'/removecart',
    edit:'/updatecart'
  },
  auth: {
    base: API_BASE_URL,
    login: '/login',
  },
  order: {
    base: API_BASE_URL + '/admin' + '/' + 'orders',
    list: '/list',
    add: '/add',
  },
  orderClient: {
    base: API_BASE_URL + '/' + 'orders',
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
    update: '',
    delete: '',
    getById: '',
  },

  comment: {
    base: API_BASE_URL +'/admin'+ '/' + 'comments',
    list: '/list',
    add: '/add',
  },
  contact: {
    base: `${API_BASE_URL}/contact`,
    list: `${API_BASE_URL}/admin/contacts`,
    id: (id: number | string) => `${API_BASE_URL}/admin/contact/${id}`,
  },
};