import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Item from '@mui/material/Unstable_Grid2';

import './Search.css'

export const Search = () => {
    return (
            <Grid className='SearchPage'  container>
                <Grid xs={3}
                      display="flex"
                      justifyContent="center"
                      alignItems="center">
                    <Item>1</Item>
                </Grid>
                <Grid xs={9}
                      display="flex"
                      justifyContent="center"
                      alignItems="center">
                    <Item>2</Item>
                </Grid>
            </Grid>
    );
};