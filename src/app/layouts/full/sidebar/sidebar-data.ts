import { NavItem } from "./nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Thống kê',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    navCap: 'Quản lý',
  },
  {
    displayName: 'Loại sản phẩm',
    iconName: 'adjustments-minus',
    route: '/admin/categories', // Cập nhật
  },
  {
    displayName: 'Sản phẩm',
    iconName: 'info-circle',
    route: '/admin/chips', // Cập nhật
  },
  {
    displayName: 'Người dùng',
    iconName: 'list-details',
    route: '/admin/lists', // Cập nhật
  },
  {
    displayName: 'Bình luận',
    iconName: 'clipboard-text',
    route: '/admin/forms', // Cập nhật
  },
  {
    displayName: 'Đơn hàng',
    iconName: 'table',
    route: '/admin/tables', // Cập nhật
  },
  {
    navCap: 'Xác thực',
  },
  {
    displayName: 'Đăng nhập',
    iconName: 'login',
    route: '/authentication',
    children: [
      {
        displayName: 'Đăng nhập',
        iconName: 'point',
        route: '/authentication/login',
      },
    ],
  },
  {
    displayName: 'Đăng ký',
    iconName: 'user-plus',
    route: '/authentication',
    children: [
      {
        displayName: 'Đăng ký',
        iconName: 'point',
        route: '/authentication/register',
      },
    ],
  },
];
