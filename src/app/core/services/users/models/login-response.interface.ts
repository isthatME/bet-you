export interface LoginResponse {
    succed: boolean;
    code: number;
    data: loginMessage
    message: string;
}
interface loginMessage {
    token: string; 
    id: string;
    username: string;
}