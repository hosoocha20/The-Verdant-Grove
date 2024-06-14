export interface IUser{
    firstName: string;
    lastName: string;
    email: string;
    pw: string;
}

export interface IUserProfile{
    firstName: string;
    lastName: string;
    email: string;
    address1: string;
    address2: string;
    zip: string;
}

export interface ILoginUser{
    email: string;
    pw: string;
}
