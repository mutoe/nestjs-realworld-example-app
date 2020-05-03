export interface AuthData {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  bio: string | null;
  image: string | null;
  token: string;
  // password?: never;
}

export interface AuthRO {
  user: AuthData;
}
