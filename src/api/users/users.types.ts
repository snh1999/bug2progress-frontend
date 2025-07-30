export type TProfile = {
  userId: string;
  bio?: string;
  name: string;
  username: string;
  country: string;
  birthday: Date;
  photo: object;
  user?: TUser;
};

export type TUser = {
  id: string;
  joinedAt: Date;
  updatedAt: Date;
  email: string;
  role: ERole;
  isActive: boolean;
};

export type TUserWithProfile = TUser & {
    profile: TProfile
}

export enum ERole {
  ADMIN = "ADMIN",
  USER = "USER",
}
