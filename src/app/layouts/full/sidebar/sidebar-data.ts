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
    route: '/ui-components/categories',
  },
  {
    displayName: 'Sản phẩm',
    iconName: 'info-circle',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Người dùng',
    iconName: 'list-details',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Bình luận',
    iconName: 'clipboard-text',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Đơn hàng',
    iconName: 'table',
    route: '/ui-components/tables',
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
