import { NavItem } from "./nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Thống kê',
    iconName: 'layout-grid-add',
    route: '/admin',
  },
  {
    navCap: 'Quản lý',
  },
  {
    displayName: 'Loại sản phẩm',
    iconName: 'adjustments-minus',
    route: '/admin/categories', 
    children: [
      {
        displayName: 'Thêm loại sản phẩm',
        iconName: 'plus-circle', 
        route: '/admin/categories/add',
      }
    ],

  },
  {
    displayName: 'Sản phẩm',
    iconName: 'info-circle',
    route: '/admin/chips',
  },
  {
    displayName: 'Người dùng',
    iconName: 'list-details',
    route: '/admin/lists',
  },
  {
    displayName: 'Bình luận',
    iconName: 'clipboard-text',
    route: '/admin/forms',
  },
  {
    displayName: 'Đơn hàng',
    iconName: 'table',
    route: '/admin/orders',
    children: [
      {
        displayName: 'Danh sách đơn hàng',
        iconName: 'point',
        route: '/admin/orders',
      },
      {
        displayName: 'Lịch sử đơn hàng',
        iconName: 'point',
        route: '/admin/orders_history',
      },
    ],
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
