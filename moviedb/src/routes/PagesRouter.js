import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {PageCover} from "../pages/PageCover";
import {PageMain} from "../pages/PageMain";
import {PageTop250Movies} from "../pages/PageTop250Movies";

export const PagesRouter = () => {
          
    return (
      <Routes>
        <Route path="/" end element={<PageCover/>}/>
        <Route path='/main' element={<PageMain/>}>
          <Route path='top250movies/:pageNumber' element={<PageTop250Movies/>}/>
        </Route>
      </Routes>
    );
    
};
