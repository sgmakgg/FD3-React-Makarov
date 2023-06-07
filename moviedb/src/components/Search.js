import React from 'react';

import './Search.css'
import {Grid} from "@mui/material";

export const Search = () => {
    return (
            <Grid className='SearchPage'  container>
                <Grid item xs={3}>
                    <div style={{backgroundColor: 'red', height:'100%'}}></div>
                </Grid>
                <Grid item xs={9} zeroMinWidth>
                    <div style={{backgroundColor: 'green', height:'100%'}}></div>
                </Grid>
            </Grid>
        // </div>
    );
};