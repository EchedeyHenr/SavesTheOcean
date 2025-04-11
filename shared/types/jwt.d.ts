export interface UserPayload {
    id: number;
    email: string;
    name: string;
    lastname: string;
    iat?: number;
    exp?: number;
  }

  declare module 'jwt-decode' {
    export function jwtDecode<T>(token: string): T;
  }