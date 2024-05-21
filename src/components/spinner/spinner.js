import React from "react";
import SpinnerImg from '../../assests/img/spinner-icon-gif-10.jpg'

let Spinner = ()=>{
    return(
        <React.Fragment>
            <div>
                <img src={SpinnerImg} className="d-block m-auto " style={{width:'200px'}}></img>
            </div>
        </React.Fragment>
    )
}
export default Spinner;