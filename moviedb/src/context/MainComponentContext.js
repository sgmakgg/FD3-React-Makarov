import React from 'react';

export const MainComponentContext = React.createContext( {
    elementsPerPage: 10,
    pageNumber: 1,
    searchField: '',
    activeChild: ''
} );