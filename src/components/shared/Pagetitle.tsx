interface PagetitileProps {
    titleText: string;
}

function Pagetitle(props: PagetitileProps){
    return (
        <div className="row">
            <h2 className="text-center">{props.titleText}</h2>
        </div>
    );
}

export default Pagetitle;