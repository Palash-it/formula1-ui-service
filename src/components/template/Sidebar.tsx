//react components
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';

function Sidebad(){

    return (
        <div className="row">
            <div className="col-md-4">
                <h1>Formula 1 API</h1>
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Seasons</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup as="ul">
                                <ListGroup.Item as="li">
                                    All Seasons
                                </ListGroup.Item>
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}

export default Sidebad;