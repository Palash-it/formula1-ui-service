//react components
import React, {useState, useEffect, Suspense} from 'react';
import { useParams, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

//lib, helpers
import {APIRequest} from './helpers/apirequesthelper';

//types
import {ApiBaseResponse,RaceResult, REQUEST_METHOD_TYPES} from '../types';

//components
import Pagetitle from './shared/Pagetitle';


interface RaceResultsProps{

}
function RaceResults(props:RaceResultsProps){
    let { season, round } = useParams();
    
    const [apiResponse, setApiResponse] = useState<ApiBaseResponse>({
        series : "",
        url: "",
        limit: 0,
        offset: 0,
        total: 0
    });
    const [raceResults, setRaceResults] = useState<RaceResult[]>([]);

    useEffect(() => {
        console.log("seaons and round:", season, round);
        APIRequest(`seasons/${season}/${round}/results`, REQUEST_METHOD_TYPES.GET, {})?.then((response) => {
            if(response.responseCode === 200){
                //can be used a toast to show message popup //
                setApiResponse(response.responseData);
                setRaceResults(response.responseData.raceResults);
            }
        }).catch((error) => {
            console.log("ERROR",error);
        })
    },[]);

    return (
        <div className="container">
            <Pagetitle titleText = {`Race Results For Season: ${season} Round: ${round}`}/>
            <div className="row">
                <div className='col-md-8'>Total Results : {apiResponse.total}</div>
                <div className='col-md-4'>
                    <Button variant="link float-end"> 
                        <Link to={`/season/${season}/races`}>See All Races</Link>
                    </Button>
                    <Button variant="link float-end"> 
                        <Link to="/home">Home</Link>
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
                                <th>Points</th>
                                <th>Status</th>
                                <th>Time</th>
                                <th>Fastest Lap Rank</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                raceResults.map((result, index) => {
                                    return (
                                        <tr key={`tr-${index}`}>
                                            <td>{result.position}</td>
                                            <td>{result.driverGivenName + " "+ result.driverFamilyName}</td>
                                            <td>{result.points}</td>
                                            <td>{result.status}</td>
                                            <td>{result.time}</td>
                                            <td>{result.fastestLapRank}</td>
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

export default RaceResults;