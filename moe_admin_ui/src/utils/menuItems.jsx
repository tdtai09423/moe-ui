import { 
  AppstoreOutlined, UserOutlined, WalletOutlined, 
  ReadOutlined, SettingOutlined, HomeOutlined, QuestionCircleOutlined 
} from '@ant-design/icons';

export const ADMIN_MENU = [
  { key: '/', icon: <AppstoreOutlined />, label: 'Dashboard' },
  { key: '/accounts', icon: <UserOutlined />, label: 'Account Management' },
  { key: '/topup', icon: <WalletOutlined />, label: 'Top-up Management' },
  { key: '/course', icon: <ReadOutlined />, label: 'Course Management' },
  { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
];

export const USER_MENU = [
  { key: '/user', icon: <HomeOutlined />, label: 'Dashboard' },
  { key: '/user/balance', icon: <WalletOutlined />, label: 'Account Balance' },
  { key: '/user/courses', icon: <ReadOutlined />, label: 'Your Courses' },
  { key: '/user/profile', icon: <UserOutlined />, label: 'My Profile' },
  { key: '/user/support', icon: <QuestionCircleOutlined />, label: 'Help & Support' },
];

export const getSelectedKey = (pathname) => {
  if (pathname.startsWith('/accounts')) return '/accounts';
  if (pathname.startsWith('/topup')) return '/topup';
  if (pathname.startsWith('/course')) return '/course';
  if (pathname.startsWith('/settings')) return '/settings';
  return '/';
};