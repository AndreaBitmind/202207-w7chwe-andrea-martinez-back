export interface UserRegister {
  userName: string;
  password: string;
  image: string;
}

export interface CustomJwTPayload {
  id: string;
  userName: string;
}

export interface UserLogin {
  id: string;
  userName: string;
  password: string;
}
