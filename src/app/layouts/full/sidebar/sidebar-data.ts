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
    route: '/admin/product',
    children: [
      {
        displayName: 'Danh sách sản phẩm',
        iconName: 'point',
        route: '/admin/product',
      },
      {
        displayName: 'Thêm sản phẩm',
        iconName: 'point',
        route: '/admin/add-product',
      },
    ],  },
  {
    displayName: 'Người dùng',
    iconName: 'info-circle',
    route: '/admin/users',
    children: [
      {
        displayName: 'Danh sách người dùng',
        iconName: 'point',
        route: '/admin/users',
      },
      {
        displayName: 'Thêm người dùng',
        iconName: 'point',
        route: '/admin/add-user',
      },
    ],
  },
    {
      displayName: 'Bình luận',
      iconName: 'table',
      route: '/ui-components/comments',
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
    ],  },
    {
      navCap: 'Xác thực',
    },
    {
      displayName: 'Đăng nhập',
      iconName: 'login',
      route: '/authentication/login',
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
      route: '/authentication/register',
      children: [
        {
          displayName: 'Đăng ký',
          iconName: 'point',
          route: '/authentication/register',
        },
      ],
    },
];
