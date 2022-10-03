//react components
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
//styles
import './Auth.css';

//types
import {REQUEST_METHOD_TYPES} from '../../types';

//Constants
import {JWT_TOKEN} from '../utils/constants';

//lib, helpers
import {APIRequest} from '../helpers/apirequesthelper';

interface LoginProps {
    updateTokenHandler(token:string, isValidAuth:boolean): any;
    isAuthenticated: boolean;
}

function Login({updateTokenHandler, isAuthenticated}: LoginProps){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [logMessage, setLogMessage] = useState({
        message: "",
        type : ""
    });

    const handleLoginFormSubmit = (e: any) => {
        e.preventDefault()
        let isValid = isValidate();
        if(isValid){
            APIRequest("auth/token", REQUEST_METHOD_TYPES.POST, getPayload())?.then((response) => {
                if(response.token){
                    setLogMessage({
                        message : "Login Success",
                        type: "success"
                    });
                    localStorage.setItem(JWT_TOKEN, response.token);
                    sessionStorage.setItem(JWT_TOKEN, response.token);
                    updateTokenHandler(response.token, true);
                    navigate("/home");
                } else {
                    setLogMessage({
                        message : response.message,
                        type: "error"
                    });
                }
            }).catch((error) => {
                console.log("ERROR",error);
            })
        } else {
            setLogMessage({
                message : "Form validation failed",
                type: "error"
            });
        }
    }

    //build Payload to submit
    const getPayload = () => {
        return {
            username : username,
            password : password
        };
    }

    /**
     * Write form validatoin code. Now keep it very simple
     */
    const isValidate = () => {
        if(username && password)
            return true;
        return false;
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={e => handleLoginFormSubmit(e)}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    {
                        logMessage && (
                            <p className={logMessage.type === 'success' ? 'text-center text-success' : 'text-center text-danger'}>
                                {logMessage.message}
                            </p>
                        )
                    }
                    <div className="form-group mt-3">
                        <label>User name</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control mt-1"
                            placeholder="Enter username"
                            onChange={(e) => setUsername(e.target.value)}
                            value = {username}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            value = {password}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;