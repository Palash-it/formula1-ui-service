/**
 * For now I will implement a very simple custom pagination component with page number only
 * will make a advance one later
 */

interface PaginationProps{
    total: number;
    limit: number;
    handlePageNumberClick(clickedPage: number): any;
    currentPageNo: number;
}
function Pagination(props: PaginationProps){

    let totalPages = props.total % props.limit > 0 ? (props.total / props.limit) + 1 : props.total / props.limit;

    const getListElement = (totalPages:number) => {
        let elements = [];
        for (let i = 1; i <= totalPages; i++) {
            elements.push(
                <li className="page-item" onClick={() => props.handlePageNumberClick(i)} key={'li-'+i}
                    style={{cursor:"pointer"}}>
                    <span className={i === props.currentPageNo ? "page-link active" : "page-link"}>{i}</span>
                </li>
            );
        }
        return elements;
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
                {getListElement(totalPages)}
            </ul>
        </nav>
    );
}
export default Pagination;