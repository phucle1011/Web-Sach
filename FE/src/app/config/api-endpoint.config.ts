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
  user: {
    base: `${API_BASE_URL}/admin/users`,
    list: '/list',
    add: '/add',
    update: '',
    delete: '',
    getById: '',
  },
  productClient: {
    base: API_BASE_URL,
    list: '/product',
  },
  categoryClient: {
    base: API_BASE_URL,
    list: '/category',
  },
  comment: {
    base: API_BASE_URL + '/admin' + '/' + 'comments',
    list: '/list',
    add: '/add',
  },
  contact: {
    base: `${API_BASE_URL}/contact`,
    list: `${API_BASE_URL}/admin/contacts`,
    id: (id: number | string) => `${API_BASE_URL}/admin/contact/${id}`,
  },
  // commentClient: {
  //   listByProductId: (productId: number) => `/product/${productId}`,
  //   add: '',
  // },
  commentClient: {
    base: API_BASE_URL,
    add: '/comments',
    get: '/comments/product/'
  },
};