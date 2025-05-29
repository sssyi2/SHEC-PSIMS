export interface userInfo  {

  id: number;
  UserName: string;
  age: number;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  country: string;
  city: string;
  area: string;
  passwordHash: string;
  real_name: string;
  role: string;
  department: string;
}
// 积分历史记录接口
export interface PointsHistory {
  id: number;
  date: string;
  type: 'earn' | 'spend'; // 积分获取或消费类型
  points: number;         // 积分变动数量（正数表示获取，负数表示消费）
  description: string;    // 积分变动描述
}

// 密码修改请求接口
export interface PasswordChangeRequest {
  currentPassword: string;  // 当前密码
  newPassword: string;      // 新密码
  confirmPassword: string;  // 确认新密码
}