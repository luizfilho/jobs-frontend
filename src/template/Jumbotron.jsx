import React from 'react';
import '../css/jumb.css'
const Jumb = props => {
    return (
        <div className='myJumb'>
            <h1 className="title">{props.title} </h1>
            <p className='subTitle'>{props.subTitle}</p>
        </div>
    );
};

export default Jumb;
