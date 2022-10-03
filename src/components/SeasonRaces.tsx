//react components
import React, {useState, useEffect, Suspense} from 'react';
import { useParams, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

//lib, helpers
import {APIRequest} from './helpers/apirequesthelper';

//types
import {ApiBaseResponse,Races, REQUEST_METHOD_TYPES} from '../types';

//components
import Pagetitle from './shared/Pagetitle';
import RecordPerPageProps from './shared/RecordPerPage';
import Pagination from './shared/Pagination';

interface SeasonRacesProps{

}
function SeasonRaces(pros: SeasonRacesProps){
    let { season } = useParams();
    const [apiResponse, setApiResponse] = useState<ApiBaseResponse>({
        series : "",
        url: "",
        limit: 0,
        offset: 0,
        total: 0
    });
    const [races, setRaces] = useState<Races[]>([]);
    const [limit, setLimit] = useState<string>("30");
    const [pageNo, setPageNo] = useState<number>(1);

    useEffect(() => {
        APIRequest(`seasons/${season}/races`, REQUEST_METHOD_TYPES.POST, getSeasonRacePageLoad())?.then((response) => {
            if(response.responseCode === 200){
                //can be used a toast to show message popup //
                setApiResponse({...response.responseData});
                setRaces(response.responseData.races);
            }
        }).catch((error) => {
            console.log("ERROR",error);
        })
    },[limit, pageNo]);

    const getSeasonRacePageLoad = () => {
        let formData = new FormData();
        formData.append('limit', limit);
        formData.append('pageNo', pageNo.toString());
        return formData;
    }

    const handlePageNumberClick = (clickedPageNo: number) => {
        setPageNo(clickedPageNo)
    }

    const handleRecordPerPageChange = (recordPerPage: string) => {
        setLimit(recordPerPage)
    }

    return (
        <div className="container">
            <Pagetitle titleText = {`All Races of Season : ${season}`}/>
            <div className="row">
                <div className='col-md-8'>Total Races : {apiResponse.total}</div>
                <div className='col-md-4'>
                    <Button variant="link float-end"> 
                        <Link to={`/season/${season}/finalStandings`}>See Final Standings</Link>
                    </Button>
                    <Button variant="link float-end"> 
                        <Link to="/home">Back</Link>
                    </Button>
                </div>
            </div>
                   
            <div className='row mb-3'>
                <RecordPerPageProps 
                    handleRecordPerPageChange = {handleRecordPerPageChange} 
                    defaultSelectedLimit = {parseInt(limit)}
                />
                <div className='col-md-8'>
                    <Pagination 
                        limit={parseInt(limit)} 
                        total = {apiResponse.total}
                        handlePageNumberClick = {handlePageNumberClick}
                        currentPageNo = {pageNo}
                    />
                </div>
            </div>
            <div className='row'>
                <Suspense fallback = {<Spinner animation="grow"/>}>
                    <div className='col-md-12'></div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#Round</th>
                                <th>Race url</th>
                                <th>Race Name</th>

                                <th>Circuit ID</th>
                                <th>Circuit Name</th>
                                <th>Circuit Url</th>

                                <th>Locality</th>
                                <th>Country</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                races.map((race, index) => {
                                    return (
                                        <tr key={`tr-${index}`}>
                                            <td>
                                                <Link title='Show Results' to={`/season/${season}/${race.round}/results`}>{race.round}</Link>
                                            </td>
                                            <td><a href={race.raceUrl} target="_blank">click</a></td>
                                            <td>
                                                <Link title='Show Qualify Time' to={`/season/${season}/${race.round}/qualifying`}>{race.raceName}</Link>
                                            </td>

                                            <td>{race.circuitId}</td>
                                            <td>{race.circuitName}</td>
                                            <td><a href={race.circuitUrl} target="_blank">click</a></td>

                                            <td>{race.locality}</td>
                                            <td>{race.country}</td>
                                            <td>{race.date}</td>
                                            <td>{race.time}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </Suspense>
            </div>
            <Pagination 
                limit={parseInt(limit)} 
                total = {apiResponse.total}
                handlePageNumberClick = {handlePageNumberClick}
                currentPageNo = {pageNo}
            />
        </div>
    );
}

export default SeasonRaces;