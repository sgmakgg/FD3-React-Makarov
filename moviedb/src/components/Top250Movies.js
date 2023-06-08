import React from 'react';

import './Top250Movies.css';

import Grid from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";

import {useQuery} from "react-query";
import MovieCard from "./MovieCard";

const data = JSON.parse(localStorage.getItem('Top250Movies')).items;
const item = data[0].id;

const Top250Movies = () =>{
    // const { isLoading, error, data } = useQuery(
    //     'top250movies',
    //     () =>
    //       fetch(
    //         'https://imdb-api.com/en/API/Top250Movies/k_ckcqw367'
    //       ).then((response) => response.json())
    //   );

    // if(!isLoading){
    //     console.log({isLoading, error, data});
    //     localStorage.setItem('Top250Movies', JSON.stringify(data));
    // }

    return(
        <Grid container rowSpacing={2} columnSpacing={2} disableEqualOverflow>
            {data.map((movie, index) => (
                <Grid xs={12} md={6} xl={3}
                      key={index}
                      display="flex"
                      justifyContent="center"
                      alignItems="center">
                    <Item key={item.id}>
                        <MovieCard movie={movie} key={item.id}></MovieCard>
                    </Item>
                </Grid>
            ))}
        </Grid>
    );
}

export default React.memo(Top250Movies);