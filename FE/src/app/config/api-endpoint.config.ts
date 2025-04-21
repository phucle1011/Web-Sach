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
    register: '/register',
    forgotPassword: '/forgot-password',
    otp: '/otp',
    resetPassword: '/reset-password',
  },
  order: {
    base: API_BASE_URL + '/admin' + '/' + 'orders',
    list: '/list',
    add: '/add',
  },
  statistics: {
    base: `${API_BASE_URL}/admin/statistics`,
    totalRevenue: '/total-revenue',
    totalOrders: '/total-orders',
    topSelling: '/top-selling-products',
    userCount: '/user-count',
    categoryCount: '/category-count',
    productCount: '/product-count',
    commentCount: '/comment-count',
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
    base: `${API_BASE_URL}/admin/product`,
    list: '/list',
    add: '/add',
    update: '/update', 
    delete: '/delete', 
    getById: '/:id', 
  },
  productClient: {
    base: API_BASE_URL,
    list: '/product',
  },
  categoryClient: {
    base: API_BASE_URL,
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
    base: API_BASE_URL + '/admin' + '/' + 'comments',
    list: '/list',
    add: '/add',
    search: '/search',
  },
  contact: {
    base: `${API_BASE_URL}/contact`,
    list: `${API_BASE_URL}/admin/contacts`,
    id: (id: number | string) => `${API_BASE_URL}/admin/contact/${id}`,
  },
  commentClient: {
    base: API_BASE_URL,
    add: '/comments',
    get: '/comments/product/'
  },
};