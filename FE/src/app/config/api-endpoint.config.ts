import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT = {
  auth: {
    base: API_BASE_URL,
    login: '/users/login',
  },
  order: {
    base: `${API_BASE_URL}/admin/orders`,
    list: '/list',
    add: '/add',
  },
  contact: {
    base: `${API_BASE_URL}/contact`,
    list: `${API_BASE_URL}/admin/contacts`,
    id: (id: number | string) => `${API_BASE_URL}/admin/contact/${id}`,
  },
  product: {
    base: `${API_BASE_URL}/admin/products`, 
    list: `${API_BASE_URL}/admin/products`, 
    id: (id: number | string) => `${API_BASE_URL}/admin/product/${id}`,
    add: `${API_BASE_URL}/admin/product`, 
  },
  category: {
    base: `${API_BASE_URL}/category`,
    adminList: `${API_BASE_URL}/admin/categories`,
  }
};
