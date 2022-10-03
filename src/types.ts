export interface RouteProps {
    children: any;
    isAuthenticated: boolean;
}

export enum REQUEST_METHOD_TYPES {
    "POST" = "post",
    "GET" = "get"
}