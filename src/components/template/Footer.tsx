import {Link} from 'react-router-dom';
interface FooterProps {
    
}
 
function Footer (props: FooterProps){
    return ( 
        <div>
            Points Scoring Supported Years : <Link to="/supported-scoring-systems">click here</Link>
        </div>
     );
}

export default Footer;