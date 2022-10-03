//react components
import React, { useEffect, useState, Suspense } from 'react';
import Spinner from 'react-bootstrap/Spinner';

//components
import Pagetitle from './shared/Pagetitle';
//lib, helpers
import {APIRequest} from './helpers/apirequesthelper';

//types
import {REQUEST_METHOD_TYPES} from '../types';

interface SupportedScoringSystemProps {

}

function SupportedScoringSystem(props: SupportedScoringSystemProps){

    const [scoreAndFormula, setScoreAndFormula] = useState<any[]>([]);
    const [scoringSystemsMap, setScoringSystemsMap] = useState<any[]>([]);
    const [defaultFormula, setDefaultFormula] = useState<string>("");

    useEffect(() => {
        APIRequest("points-scoring-system", REQUEST_METHOD_TYPES.GET, {})?.then((response) => {
            if(response.responseCode === 200){
                //can be used a toast to show message popup //
                setScoreAndFormula(response.responseData.scoringSystem);
                setScoringSystemsMap(response.responseData.scoringSystemAndSeasonMapping);
                setDefaultFormula(response.responseData.defaultFormula)
            }
        }).catch((error) => {
            console.log("ERROR",error);
        })
    },[]);

    return (
        <div className="container">
            <Pagetitle titleText = "Supported Points Scoring System as a JSON RAW Data"/>
            <div className="row mb-3">
                <h4>Supported Years Mapping with Formula</h4>
                <div><pre>{JSON.stringify(scoringSystemsMap, null, 2)}</pre></div>
            </div>

            <div className="row mt-3">
                <h4>Scores and Formulas</h4>
                <div>
                    <pre>{JSON.stringify(scoreAndFormula, null, 2)}</pre>
                </div>
            </div>

            <div className="row mt-3">
                <h4>Default Formula when no scoring year match found</h4>
                <div>{defaultFormula}</div>
            </div>
        </div>
    );
}

export default SupportedScoringSystem;