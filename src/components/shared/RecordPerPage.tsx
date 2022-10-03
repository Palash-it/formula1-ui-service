
interface RecordPerPageProps{
    handleRecordPerPageChange(limit: string): any;
    defaultSelectedLimit: number;
}

function RecordPerPage(props: RecordPerPageProps){
    return (
        <>
            <div className='col-md-2'>
                <label className='label'>Record Per Page</label>
            </div>
            <div className='col-md-2'>
                <select className="form-select" aria-label="points-scoring" 
                    onChange={(e) => props.handleRecordPerPageChange(e.target.value)}
                    defaultValue = {props.defaultSelectedLimit}
                >
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                </select>
            </div>
        </>
    );
}

export default RecordPerPage;