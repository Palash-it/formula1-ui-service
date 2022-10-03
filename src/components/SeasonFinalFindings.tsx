//react components
import React, {useState, useEffect, Suspense} from 'react';
import { useParams, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

//lib, helpers
import {APIRequest} from './helpers/apirequesthelper';

//types
import {ApiBaseResponse, SeasonFinalStandings, REQUEST_METHOD_TYPES} from '../types';

//components
import Pagetitle from './shared/Pagetitle';

interface SeasonFinalStandingsProps{

}
function SeasonFinalFindings(Props: SeasonFinalStandingsProps){
    let { season } = useParams();
    const [apiResponse, setApiResponse] = useState<ApiBaseResponse>({
        series : "",
        url: "",
        limit: 0,
        offset: 0,
        total: 0
    });
    const [seasonsFindings, setSeasonFindings] = useState<SeasonFinalStandings[]>([]);


    useEffect(() => {
        APIRequest(`seasons/${season}/finalStandings`, REQUEST_METHOD_TYPES.GET, {})?.then((response) => {
            if(response.responseCode === 200){
                //can be used a toast to show message popup //
                setApiResponse(response.responseData);
                setSeasonFindings(response.responseData.seasonFinalStandingsList);
            }
        }).catch((error) => {
            console.log("ERROR",error);
        })
    },[]);

    return (
        <div className="container">
            <Pagetitle titleText = {`Final Standings of Season : ${season}`}/>
            <div className="row">
                <div className='col-md-8'>Total Standings : {apiResponse.total}</div>
                <div className='col-md-4'>
                    <Button variant="link float-end"> 
                        <Link to={`/season/${season}/races`}>See All Races</Link>
                    </Button>
                    <Button variant="link float-end"> 
                        <Link to="/home">Back</Link>
                    </Button>
                </div>
            </div>
            <div className='row'>
                <Suspense fallback = {<Spinner animation="grow"/>}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#Position</th>
                                <th>Pilot</th>
                                <th>Constructor</th>
                                <th>Constructor's Nationality</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                seasonsFindings.map((findings, index) => {
                                    return (
                                        <tr key={`tr-${index}`}>
                                            <td>{findings.position}</td>
                                            <td>{findings.driverGivenName + " "+ findings.driverFamilyName}</td>
                                            <td>{findings.constructorName}</td>
                                            <td>{findings.constructorNationality}</td>
                                            <td>{findings.points}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </Suspense>
            </div>
        </div>
    );
}

export default SeasonFinalFindings;