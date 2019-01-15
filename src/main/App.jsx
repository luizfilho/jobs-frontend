import React from 'react';
import Routes from './Routes'
import CustomNav from '../template/CustomNav'
import '../css/app.css'

export default () => (
    <div >
        <CustomNav/>
        <Routes logged={123}/>
    </div>
)
