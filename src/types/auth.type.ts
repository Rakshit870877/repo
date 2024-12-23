export interface Loginreq {
  email: string
  password: string
}

export interface BaseResponse {
  success: boolean
  message: string
}
export interface LoginResponse {
  success: boolean
  token: string
  admin: Admin
  role: string
}

export interface Admin {
  adminBranch: string
  _id: string
  adminName: string
  adminEmail: string
  adminPassword: string
  adminRole: string
  adminPhone: string
  adminAddress: string
  adminId: string
  createdAt: string
  updatedAt: string
  __v: number
  adminOtp: string
}

export interface User {
  email: string
  user_id: string
  role: string
}
