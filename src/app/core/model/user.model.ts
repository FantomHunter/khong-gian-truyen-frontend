export interface User {
    id: string;
    name: string;
    token: string;
    refreshToken: string;
}

export interface Credential {
    username: string;
    password: string;
}