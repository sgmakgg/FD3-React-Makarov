import React from 'react';

import './Cover.css'
import iPhone from '../images/iPhone.svg';
import movieDB from '../images/movieDB.svg';

export const Cover = () => {

    return (
        <div className='CoverPage' >
            <img className='IPhone'
                 style={{
                         position: "absolute",
                         bottom: 0,
                         right: 0,
                         height:'80%',
                         width:'80%',
                         }} src={iPhone} alt='Iphone_picture'/>
            <img className='IPhone'
                 style={{
                        position: "absolute",
                        left: '5vw',
                        top: '20vh',
                        height:'30%',
                        width:'30%',
                        }} src={movieDB} alt='MovieDB_picture'/>
            <input className='StartButton' type='button' value={'Try\xa0it\xa0now'}
                   style={{
                       position: "absolute",
                       left: '5vw',
                       top: '45vh',
                       height:'10%',
                       width:'15%',
                   }} src={movieDB} alt='MovieDB_picture'/>
        </div>
    );

};