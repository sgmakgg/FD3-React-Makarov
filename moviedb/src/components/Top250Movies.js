import React, {useContext, useEffect, useState} from 'react';

import './Top250Movies.css';

import Grid from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";

// import {useQuery} from "react-query";
import MovieCard from "./MovieCard";
import {MainComponentContext} from "../context/MainComponentContext";
import {pageCountEvent, pagesNumber, pagesQuantity} from "../events/PageCounterEvent";
import {useParams} from "react-router-dom";

 const Top250Movies = () =>{
     let data = JSON.parse(localStorage.getItem('top250Movies')).items;

    const mainContext = useContext(MainComponentContext);
    const params = useParams();

    const[responseData, setResponseData] = useState(data);
    const[pageSize, setPageSize] = useState(mainContext.elementsPerPage);
    const[page, setPage] = useState(params.pageNumber);
    const[currentPageArr, setCurrentPageArr] = useState(null);

    useEffect(()=>{
                setResponseDataWithSearchFieldValue();
            },[mainContext.searchField]);

    useEffect(
        ()=>{
            if(responseData.length !== 0){
                countPages();
            }
            setPage(params.pageNumber);
            pageCountEvent.emit(pagesNumber, params.pageNumber);
            currentPage();
        },[responseData, page, params.pageNumber]);

    // useQuery hook

    // const { isLoading, error, data } = useQuery(
    //     'top250movies',
    //     () =>
    //       fetch(
    //         'https://imdb-api.com/en/API/Top250Movies/k_ckcqw367'
    //       ).then((response) => response.json())
    //   );
    //
    // if(!isLoading){
    //     console.log({isLoading, error, data});
    //     localStorage.setItem('Top250Movies', JSON.stringify(data));
    // }

    const setResponseDataWithSearchFieldValue = () => {
        if(mainContext.searchField !== ''){
            let res = data.filter(movie => movie.title.includes(mainContext.searchField) === true)
            setResponseData(res);
        }
        else
            setResponseData(data);
    }

    const countPages = () =>{
        let countPages = responseData.length/pageSize;
        if(Number.isInteger(countPages))
            pageCountEvent.emit(pagesQuantity, countPages);
        else
            pageCountEvent.emit(pagesQuantity, parseInt(countPages + 1));
    }

    const currentPage = () => {
        let firstIndex = ((page - 1) * pageSize);
        let lastIndex = firstIndex + pageSize;
        let res = responseData.slice(firstIndex, lastIndex);
        setCurrentPageArr(res);
    }


    return(
        (currentPageArr !== null) &&
        <Grid container rowSpacing={2} columnSpacing={2} disableEqualOverflow>
            {currentPageArr.map((movie, index) => (
                <Grid xs={12} md={6} xl={3}
                      key={index}
                      display="flex"
                      justifyContent="center"
                      alignItems="center">
                    <Item key={movie.id}>
                        <MovieCard movie={movie} key={movie.id}></MovieCard>
                    </Item>
                </Grid>
            ))}
        </Grid>
    );
}

export default React.memo(Top250Movies);