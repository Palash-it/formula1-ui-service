import { JWT_TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';

/**
 * Check all possible condition to make sure there is a valid token for authentication
 * @returns boolen
 */
interface DecodeToken {
    sub: string;
}

export const hasValidToken = () => {
    const token = localStorage.getItem(JWT_TOKEN);
    const sesToken = sessionStorage.getItem(JWT_TOKEN);
    if(token === null || token === undefined || token === "undefined")
        return false;
    if(token && sesToken){
        try {
            const decodedToken: DecodeToken = jwtDecode(token);
            if(decodedToken.sub){
                return true;
            }
        } catch (error) {
            console.log("Something went wrong!",error);
        }
    } 
    return false;
}

export const getToken = () => {
    if(hasValidToken()){
        const token = localStorage.getItem(JWT_TOKEN);
        if(token){
            return token;
        }
    }
    return "";
}

export const getDecodedToken = () => {
    if(hasValidToken()){
        const token:any = localStorage.getItem(JWT_TOKEN);
        const decodedToken = jwtDecode(token);
        return decodedToken;
    }
    return "";
}

export const getValueFromToken = (prop:string) => {
    if(hasValidToken()){
        const decodedToken = JSON.parse(JSON.stringify(getDecodedToken()));
        if(decodedToken.hasOwnProperty(prop))
            return decodedToken[prop];
    }
    return "";
}

/**
 * Remove token from locastorage and sessionstorage
 */
export const signOut = () => {
    localStorage.removeItem(JWT_TOKEN);
    sessionStorage.removeItem(JWT_TOKEN);
}


export const getAuthenticatedUser = () => {
    const user = {
        "username": getValueFromToken("sub"),
        "userId": getValueFromToken("userId"),
        "iss" : getValueFromToken("iat"),
        "exp" : getValueFromToken("exp")
    }
    return user;
}
