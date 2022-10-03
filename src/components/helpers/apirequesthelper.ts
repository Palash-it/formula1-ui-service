//constants
import { JWT_TOKEN, AUTH_HEADER_KEY } from "../utils/constants";

//types
import {REQUEST_METHOD_TYPES} from '../../types';

export const APIRequest = function (uriPath:string, methodType: REQUEST_METHOD_TYPES, payload:any) {

    if (methodType === REQUEST_METHOD_TYPES.POST && uriPath.endsWith(JWT_TOKEN)) {
        return fetch(process.env.REACT_APP_API_URL + "auth/token", {
            method: REQUEST_METHOD_TYPES.POST,
            mode: "cors",
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
        }).then((response) => {
            return response.json();
        }).catch((error) => {
            console.error("ERROR: ", error);
        });
    }
}