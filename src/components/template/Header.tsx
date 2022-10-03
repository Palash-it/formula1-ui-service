//react components
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

interface HeaderProps {
    isAuthenticated: boolean;
    handleSignOut():any;
}

export default function Header(props: HeaderProps){
    return (
        <header className="p-3 mb-3 border-bottom bg-dark">
            <div className="container">
                <div className='row'>
                    <div className='col-md-8'>
                        <Link to="/home">
                            <img src="" alt='app logo'/>
                        </Link>
                    </div>
                    <div className='col-md-4'>
                        {
                            props.isAuthenticated && (
                                <Dropdown className=' float-end'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <img src="/images/avatar.png" alt="profile picture" width="32" height="32" className="rounded-circle"/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#">Action</Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={props.handleSignOut}>Sign out</Dropdown.Item>
                                        <Dropdown.Item href="#">Change Password</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}