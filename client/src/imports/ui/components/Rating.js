import React from 'react'
import _ from 'lodash'
function Rating({rating}) {
    const r = parseInt(rating)
    return (
        <div className="rating">
            {_.range(5).map(i=>{
            if(i+1>r)
            return <img alt="" key={i} src="/assets/img/star-empty.svg"/>
            return <img alt=""key={i} src="/assets/img/star.svg"/>
            })}
         
        </div>
    )
}

export default Rating
