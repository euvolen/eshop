import React from 'react';
import spinner from "../data/spinner.gif";

export default ()=> {
{
    return (
      <div>
        <img 
        src={spinner}
        style={{width:'200px', margin:'auto', display:'no-lone-blocks'}} 
        alt="Loading..."/> 
      </div>
    )
  }
}
