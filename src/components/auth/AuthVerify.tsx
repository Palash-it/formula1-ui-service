//constants
import { JWT_TOKEN } from '../utils/constants';
//libs
import jwtDecode from 'jwt-decode';

interface AuthVerifyProps {
    signOut(): any;
}
interface DecodeToken {
    exp: number;
}

function AuthVerify(props: AuthVerifyProps){

    const token = localStorage.getItem(JWT_TOKEN);
    if(token && token !== "undefined"){  
        const decodedToken:DecodeToken = jwtDecode(token);
        if(new Date(decodedToken.exp * 1000) < new Date()){
            props.signOut();
        }
    } else {
        props.signOut();
    }

    return (
        <></>
    );
}

export default AuthVerify;