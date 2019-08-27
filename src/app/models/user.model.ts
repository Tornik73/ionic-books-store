export interface User {
    id?: number;
    email?: string;
    name?: string;
    lastname?: string;
    password?: string;
    age?: number;
    telephone?: string;
    gender?: string;
    country?: string;
    username?: string;
    img?: string;
    isAdmin?: boolean;
    isActive?: boolean;
    token?: string;
}

export interface LocalUser {
    token: string;
    img: string;
}
