//react components
import React, { useEffect, useState, Suspense } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

//components
import Pagetitle from './shared/Pagetitle';
//lib, helpers
import {APIRequest} from './helpers/apirequesthelper';

//types
import {ApiBaseResponse, Season, REQUEST_METHOD_TYPES} from '../types';

interface HomeProps {

}

function Home(props: HomeProps){
    const [apiResponse, setApiResponse] = useState<ApiBaseResponse>({
        series : "",
        url: "",
        limit: 0,
        offset: 0,
        total: 0
    });
    const [seasons, setSeasons] = useState<Season[]>([]);

    useEffect(() => {
        APIRequest("seasons", REQUEST_METHOD_TYPES.GET, {})?.then((response) => {
            if(response.responseCode === 200){
                //can be used a toast to show message popup //
                setApiResponse({...response.responseData});
                setSeasons(response.responseData.seasons);
            }
        }).catch((error) => {
            console.log("ERROR",error);
        })
    },[]);


    return (
        <div className="container">
            <Pagetitle titleText = "Welcome to Formula One World Championship"/>
            <div className="row">
                <h3>Fina all seasons from the begining : {apiResponse.total > 0 ? "Total Seasons : "+apiResponse.total : ""}</h3>
                <Suspense fallback = {<Spinner animation="grow"/>}>
                    {
                        seasons.map((season, index) => {
                            return (
                                <Card style={{ width: '18rem',marginRight:"1rem", marginBottom:"1rem" }} key={'card-'+index}>
                                    <Card.Body>
                                        <Card.Title className='text-center'>{season.season}</Card.Title>
                                        <Card.Text className='text-center'>
                                            <a href={season.url} target="_blank">Wiki</a>
                                        </Card.Text>
                                        <Button variant="primary">
                                            <Link to={`/season/${season.season}/finalStandings`} style={{color:'#FFFFFF', textDecoration: 'none'}}>Final Standings</Link>
                                        </Button>
                                        <Button variant="info ms-2">
                                            <Link to={`/season/${season.season}/races`} style={{textDecoration: 'none'}} >Races</Link>
                                        </Button>
                                    </Card.Body>
                                </Card>
                            );
                        })
                    }
                </Suspense>
            </div>
        </div>
    );
}

export default Home;