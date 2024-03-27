import '../../index.css';



function AverageNumbers({summaryNumber, summaryTitle, units}) {


    return (
        <div className='card'>
            <div className='card__content flex flex-col justify-center items-center h-full'>
                <p className="summary-title text-gray-700 m-2">{summaryTitle}</p>
                <p className="summary-number text-3xl font-bold text-primary">{summaryNumber} {units}</p>
            </div>
        </div>
    )
}

export default AverageNumbers;
