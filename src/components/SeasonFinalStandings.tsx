//react components
import React, {useState, useEffect, Suspense} from 'react';
import { useParams, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

//lib, helpers
import {APIRequest} from './helpers/apirequesthelper';

//types
import {ApiBaseResponse, SeasonFinalStanding, REQUEST_METHOD_TYPES} from '../types';

//components
import Pagetitle from './shared/Pagetitle';
import RecordPerPageProps from './shared/RecordPerPage';
import Pagination from './shared/Pagination';
interface SeasonFinalStandingsProps{

}
function SeasonFinalStandings(Props: SeasonFinalStandingsProps){
    let { season } = useParams();
    const [apiResponse, setApiResponse] = useState<ApiBaseResponse>({
        series : "",
        url: "",
        limit: 0,
        offset: 0,
        total: 0
    });
    const [seasonsFindings, setSeasonFindings] = useState<SeasonFinalStanding[]>([]);
    const [limit, setLimit] = useState<string>("30");
    const [pageNo, setPageNo] = useState<number>(1);

    useEffect(() => {
        APIRequest(`seasons/${season}/finalStandings`, REQUEST_METHOD_TYPES.POST, getFinalStandingsPageLoad())?.then((response) => {
            if(response.responseCode === 200){
                //can be used a toast to show message popup //
                setApiResponse({...response.responseData});
                setSeasonFindings(response.responseData.seasonFinalStandingsList);
            }
        }).catch((error) => {
            console.log("ERROR",error);
        })
    },[limit, pageNo]);

    const getFinalStandingsPageLoad = () => {
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

export default SeasonFinalStandings;