export interface IUserLogin {
  email: string,
  password: string,
}

export interface IUser extends IUserLogin {
  id: number,
  role: string,
  username: string,
}
