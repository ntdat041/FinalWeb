import React, { useState, useEffect } from 'react';
import './Patigation.css';

function Patigation({setCurrentPage }){
    const [limitPage, setLimitPage] = useState(1);
    useEffect(() => {
        
    },[])
    return(
        <div className="patigation">
            <button onClick={setCurrentPage(limitPage)} >{limitPage}</button>
            <button onClick={setCurrentPage(limitPage+1)} >{limitPage+1}</button>
            <button onClick={setCurrentPage(limitPage+2)} >{limitPage+2}</button>
            <button onClick={setCurrentPage(limitPage+3)} >{limitPage+3}</button>
            <button onClick={setCurrentPage(limitPage+4)} >{limitPage+4}</button>
            <button>></button>
        </div>
    )
}

export default Patigation;