//react components
import React, {useState, useEffect, Suspense} from 'react';
import { useParams, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

//lib, helpers
import {APIRequest} from './helpers/apirequesthelper';
import {getArrayOfYears} from './helpers/helperfunctions';

//types
import {ApiBaseResponse,RaceResult, REQUEST_METHOD_TYPES} from '../types';

//components
import Pagetitle from './shared/Pagetitle';
import RecordPerPageProps from './shared/RecordPerPage';
import Pagination from './shared/Pagination';


interface RaceResultsProps{

}
function RaceResults(props:RaceResultsProps){
    const { season, round } = useParams();
    const [pointsScoringSeason, setPointsScoringSeason] = useState<string>("");
    const seasonsFromBegining = getArrayOfYears(1950, new Date().getFullYear(), 1).reverse();
    const [apiResponse, setApiResponse] = useState<ApiBaseResponse>({
        series : "",
        url: "",
        limit: 0,
        offset: 0,
        total: 0
    });
    const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
    const [message, setMessage] = useState<string>("");
    const [limit, setLimit] = useState<string>("30");
    const [pageNo, setPageNo] = useState<number>(1);

    useEffect(() => {
        APIRequest(`seasons/${season}/${round}/results`, REQUEST_METHOD_TYPES.POST, getSeasonRaceResultPageLoad())?.then((response) => {
            if(response.responseCode === 200){
                //can be used a toast to show message popup //
                setApiResponse({...response.responseData});
                setRaceResults(response.responseData.raceResults);
            }
        }).catch((error) => {
            console.log("ERROR",error);
        })
    },[limit, pageNo]);

    const getSeasonRaceResultPageLoad = () => {
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

    const applySelectedScoringSystem = () => {
        if(parseInt(pointsScoringSeason) > 0 && pointsScoringSeason !== season){
            console.log("Selected Year:",pointsScoringSeason);
            setMessage("Please wait. processing...");
            APIRequest(`seasons/${season}/${round}/apply-points-scoring-system`, REQUEST_METHOD_TYPES.POST,getPayLoadForPointsSystem())?.then((response) => {
                console.log("response:", response);
                if(response.responseCode === 200){
                    //can be used a toast to show message popup //
                    setApiResponse(response.responseData);
                    setRaceResults(response.responseData.raceResults);
                    setMessage("Data Source Year :"+season+" and Points Scoring System applied from year : "+pointsScoringSeason);
                }
            }).catch((error) => {
                console.log("ERROR",error);
            }).finally(() => {
                
            });
        } else {
            alert("Please select a scoring year!");
        }
    }

    const getPayLoadForPointsSystem = () => {
        let formData = new FormData();
        formData.append('scoringSeason', pointsScoringSeason);
        return formData;
    }

    return (
        <div className="container">
            <Pagetitle titleText = {`Race Results For Season: ${season} Round: ${round}`}/>
            <div className="row mt-3 mb-3">
                <div className='col-md-3'>Total Results : {apiResponse.total}</div>
                <div className='col-md-3'>
                    <select className="form-select" aria-label="points-scoring" onChange={(e) => setPointsScoringSeason(e.target.value)}>
                        <option value="0">Select Season</option>
                        {seasonsFromBegining.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <small className='text-info'>We dont support all available scoring year from avobe list. Please <Link target={"_blank"} to="/supported-scoring-systems">click here</Link> to see which years we support</small>
                </div>
                <div className='col-md-2'>
                    <Button variant="primary" onClick={applySelectedScoringSystem}>Apply Scoring</Button>
                </div>
                <div className='col-md-4'>
                    <Button variant="link float-end"> 
                        <Link to={`/season/${season}/races`}>See All Races</Link>
                    </Button>
                    <Button variant="link float-end"> 
                        <Link to="/home">Home</Link>
                    </Button>
                </div>
            </div>
            <p>{message}</p>
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
            <div className='row mt-2'>
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
                <Pagination 
                    limit={parseInt(limit)} 
                    total = {apiResponse.total}
                    handlePageNumberClick = {handlePageNumberClick}
                    currentPageNo = {pageNo}
                />
            </div>
        </div>
    );
}

export default RaceResults;