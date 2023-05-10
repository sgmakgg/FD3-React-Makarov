import React from 'react';
import ReactDOM from 'react-dom';

import iShopTable from './components/IShopTable';

import shopProducts from './defaultData.json';

const shopName = 'iShop2';

ReactDOM.render(
    React.createElement(iShopTable,
        {products:shopProducts, shopName:shopName}),
    document.getElementById('container')
);