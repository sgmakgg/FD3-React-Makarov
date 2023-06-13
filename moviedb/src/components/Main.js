import React, {useEffect, useState} from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Item from '@mui/material/Unstable_Grid2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Pagination, TextField} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import './Main.css'

import {Outlet, useLocation, useNavigate} from "react-router-dom";

import {MainComponentContext} from "../context/MainComponentContext";
import {pageCountEvent, pagesNumber, pagesQuantity} from "../events/PageCounterEvent";

import {useDispatch, useSelector} from "react-redux";
import {top250moviesLoad} from "../redux/top250moviesLoad";

const theme = createTheme({
    palette: {
      secondary: {
        main: '#8033bd',
      },
    },
  });
const top250movies = 'top250movies';
const main = 'main';

const Main = () => {

    const[pagesCount, setPagesCount] = useState(0);
    const[forChildren, setForChildren] = useState({elementsPerPage: 10, pageNumber: 1, searchField: '', activeChild: ''});
    const[paginationPage, setPaginationPage] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch();
    const top250moviesRedux = useSelector(state => state.top250movies);

    useEffect(() => {
        if(top250moviesRedux.dataLoadState !== 1){
            turnOnTop250Movies();
        }
    },[top250moviesRedux.dataLoadState]);

    useEffect(()=>{
        pageCountEvent.addListener(pagesQuantity, cbPagesCount);
        pageCountEvent.addListener(pagesNumber, cbPaginationPageNumber);
        return () => {
            pageCountEvent.removeListener(pagesQuantity, cbPagesCount);
            pageCountEvent.removeListener(pagesNumber, cbPaginationPageNumber);
        };
    },[]);

    useEffect(() => {
        let uri;
        switch(forChildren.activeChild){
            case top250movies:
                uri="/main/" + encodeURIComponent(forChildren.activeChild) + "/" + encodeURIComponent(forChildren.pageNumber);
                navigate(uri);
                break;
            default:
                uri="/main";
                navigate(uri);
                break;
        }
    }, [forChildren.pageNumber, forChildren.activeChild])

    useEffect(() => {
        if(location.pathname === ('/' + main)){
            setPagesCount(0);
            setPaginationPage(0);
            setForChildren({...forChildren, activeChild: ''});
        }
    },[location])

    function load() {
        dispatch( top250moviesLoad ); // looks like a regular dispatch of a regular action
    }

    const turnOnTop250Movies = () => {
        setForChildren({...forChildren, activeChild: top250movies});
    }

    const cbPaginationPageNumber = (number) => {
        setPaginationPage(parseInt(number));
    }

    const cbPagesCount = (count) =>{
        setPagesCount(count);
    }

    const handleChange  = (EO, value) =>{
        setForChildren({...forChildren, pageNumber: value});
    }

    const setSearchFieldState = (EO) => {
        setForChildren({...forChildren, searchField: EO.target.value});
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
                            <LoadingButton loading={(top250moviesRedux.dataLoadState === 1)}
                                           loadingIndicator="Loading…"
                                           variant="outlined"
                                           color="secondary"
                                           size="large"
                                           onClick={load}>
                                {'Top\xa0250\xa0Movies'}
                            </LoadingButton>
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
                            <MainComponentContext.Provider value={forChildren}>
                                <Outlet/>
                            </MainComponentContext.Provider>
                        </Grid>
                        <Grid xs={12} display="flex"
                              justifyContent="center"
                              alignItems="center">
                            <Pagination count={pagesCount} page={paginationPage} onChange={handleChange}/>
                        </Grid>
                </Grid>
            </Grid>
    );
};

export default React.memo(Main);