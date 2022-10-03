//types
import {RouteProps} from '../../types';
//react componets
import {Navigate} from 'react-router-dom';

function PrivateRoute({children, isAuthenticated}: RouteProps){
    return (
        isAuthenticated ? children : <Navigate to = '/signin'/>
    );
}
export default PrivateRoute;