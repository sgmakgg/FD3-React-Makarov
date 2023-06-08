import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Item from '@mui/material/Unstable_Grid2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

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

    return (
            <Grid className='SearchPage'  container>
                <Grid xs={3} xl={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="top">
                    <Item>
                        <ThemeProvider theme={theme}>
                            <Button color="secondary" size="large">
                                {'Top\xa0250\xa0Movies'}
                            </Button>
                        </ThemeProvider>
                    </Item>
                </Grid>
                <Grid xs={9} xl={11}
                      display="flex"
                      justifyContent="center"
                      alignItems="center">
                    <Top250Movies/>
                </Grid>
            </Grid>
    );
};

export default React.memo(Main);