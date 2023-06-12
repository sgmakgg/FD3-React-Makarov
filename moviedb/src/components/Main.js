import React, {useState} from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Item from '@mui/material/Unstable_Grid2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Button, Pagination, TextField} from '@mui/material';

import './Main.css'

import Top250Movies from "./Top250Movies";

const theme = createTheme({
    palette: {
      secondary: {
        main: '#8033bd',
      },
    },
  });

const Main = () => {

    const[top250MoviesOn, setTop250MoviesOn] = useState(false);
    const[pagesCount, setPagesCount] = useState(0);
    const[pageNumber, setPageNumber] = useState(1);
    const[searchField, setSearchField] = useState('');

    const turnOnTop250Movies = () => {
        setTop250MoviesOn(true);}

    const cbPagesCount = (count) =>{
        setPagesCount(count);
    }
    const handleChange  = (EO, value) =>{
        setPageNumber(value);
    }

    const setSearchFieldState = (EO) => {
        setSearchField(EO.target.value);
    }
    const debounceSerie = (func,interval,immediate) => {
        let timer;
        return function() {
            let context=this, args=arguments;
            let later=function() {
                timer=null;
                if ( !immediate )
                    func.apply(context,args);
            };
            let callNow=immediate&&!timer;
            clearTimeout(timer);
            timer=setTimeout(later,interval);
            if ( callNow )
                func.apply(context,args);
        };
    };

    return (
            <Grid className='MainPage'  container>
                <Grid xs={3} xl={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="top">
                    <Item>
                        <ThemeProvider theme={theme}>
                            <Button color="secondary" size="large" onClick={turnOnTop250Movies}>
                                {'Top\xa0250\xa0Movies'}
                            </Button>
                        </ThemeProvider>
                    </Item>
                </Grid>
                <Grid container xs={9} xl={11}
                      display="flex"
                      justifyContent="center"
                      alignItems="center">
                        <Grid xs={12} display="flex"
                              justifyContent="center"
                              alignItems="center">
                                <TextField
                                    id="standard-search"
                                    label="Search field"
                                    type="search"
                                    variant="standard"
                                    sx={{width:'70%', paddingBottom:'1vh'}}
                                    onChange={debounceSerie(setSearchFieldState, 500, false)}/>
                        </Grid>
                        <Grid xs={12} sx={{minHeight:'90vh'}}>
                            {(top250MoviesOn)&&<Top250Movies cbPagesCount={cbPagesCount}
                                                             elementsPerPage={10}
                                                             pageNumber={pageNumber}
                                                             searchField={searchField}/>}
                        </Grid>
                        <Grid xs={12} display="flex"
                              justifyContent="center"
                              alignItems="center">
                            <Pagination count={pagesCount} onChange={handleChange}/>
                        </Grid>
                </Grid>
            </Grid>
    );
};

export default React.memo(Main);