import { NavItem } from './nav-item/nav-item';

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
    navCap: 'Ui Components',
  },
  {
    displayName: 'Loại sản phẩm',
    iconName: 'adjustments-minus',
    route: '/admin/categories',
  },
  {
    displayName: 'Sản phẩm',
    iconName: 'info-circle',
    route: '/ui-component',
    children: [
      {
        displayName: 'Danh sách sản phẩm',
        iconName: 'point',
        route: '/admin/chips',
      },
      {
        displayName: 'Thêm sản phẩm',
        iconName: 'point',
        route: '/admin/add-product',
      },
    ],
  },
  // {
  //   displayName: 'Người dùng',
  //   iconName: 'list-details',
  //   route: '/admin/users',
  // },
  {
    displayName: 'Người dùng',
    iconName: 'info-circle',
    route: '/ui-component',
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
    iconName: 'clipboard-text',
    route: '/admin/forms',
  },
  {
    displayName: 'Đơn hàng',
    iconName: 'table',
    route: '/admin/tables',
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
