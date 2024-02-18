type JWTUser = {
  userId: string
  userEmail: string
}

interface IUser {
  id: string
  email: string
  fullname: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
  role: Roles
}
