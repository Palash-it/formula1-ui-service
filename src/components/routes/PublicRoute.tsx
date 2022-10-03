//types
import {RouteProps} from '../../types';
//react componets
import {Navigate} from 'react-router-dom';

function PublicRoute({children, isAuthenticated}: RouteProps){
    return (
        isAuthenticated ? <Navigate to = '/home'/> : (children)
    );
}
export default PublicRoute;