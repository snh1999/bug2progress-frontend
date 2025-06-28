export type TRegisterDto = {
  email: string;
  password: string;
  name: string;
  username: string;
};

export type TLoginDto = {
  email: string;
  password: string;
};

export type TAuthResponse = {
  token: string;
  message: string;
};
