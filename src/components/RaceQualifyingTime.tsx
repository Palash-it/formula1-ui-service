//react components
import React, {useState, useEffect, Suspense} from 'react';
import { useParams, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

//lib, helpers
import {APIRequest} from './helpers/apirequesthelper';

//types
import {ApiBaseResponse, RaceQualifyTime, REQUEST_METHOD_TYPES} from '../types';

//components
import Pagetitle from './shared/Pagetitle';

interface RaceQualifyingTimeProps{

}

function RaceQualifyingTime(props: RaceQualifyingTimeProps){
    let { season, round } = useParams();
    const [apiResponse, setApiResponse] = useState<ApiBaseResponse>({
        series : "",
        url: "",
        limit: 0,
        offset: 0,
        total: 0
    });
    const [raceQualifyTime, setRaceQualifyTime] = useState<RaceQualifyTime[]>([]);

    useEffect(() => {
        APIRequest(`seasons/${season}/${round}/qualifying`, REQUEST_METHOD_TYPES.POST, {})?.then((response) => {
            if(response.responseCode === 200){
                //can be used a toast to show message popup //
                setApiResponse({...response.responseData});
                setRaceQualifyTime(response.responseData.raceQualifyingTime);
            }
        }).catch((error) => {
            console.log("ERROR",error);
        })
    },[]);


    return (
        <div className="container">
            <Pagetitle titleText = {`Final Standings of Season : ${season}`}/>
            <div className="row">
                <div className='col-md-8'>Total Records : {apiResponse.total}</div>
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
                                <th>Pilot</th>
                                <th>Q1</th>
                                <th>Q2</th>
                                <th>Q3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                raceQualifyTime.map((qualifyTime, index) => {
                                    return (
                                        <tr key={`tr-${index}`}>
                                            <td>{qualifyTime.driverGivenName + " "+ qualifyTime.driverFamilyName}</td>
                                            <td>{qualifyTime.q1}</td>
                                            <td>{qualifyTime.q2}</td>
                                            <td>{qualifyTime.q3}</td>
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

export default RaceQualifyingTime;