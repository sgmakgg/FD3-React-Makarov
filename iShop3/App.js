import React from 'react';
import ReactDOM from 'react-dom';

import IShopTable from './components/IShopTable';

import shopProducts from './defaultData.json';

const shopName = 'iShop3';

ReactDOM.render(
    <IShopTable products={shopProducts} shopName={shopName}/>,
    document.getElementById('container')
);