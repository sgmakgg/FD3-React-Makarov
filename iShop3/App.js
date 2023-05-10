import React from 'react';
import ReactDOM from 'react-dom';

import iShopTable from './components/IShopTable';

class Product{
    constructor(name, price, imageURL, warehouseQuantity, code) {
        this.name = name;
        this.price = price;
        this.imageURL = imageURL;
        this.warehouseQuantity = warehouseQuantity;
        this.code = code;
    }
};

let shopProducts = [
    new Product(
        'Milk',
        1.50,
        'images/milk.png',
        100,
        100),
    new Product(
        'Olive oil',
        20.22,
        'images/olive-oil.png',
        100500,
        200),
    new Product(
        'Bread',
        0.25,
        'images/bread.png',
        300,
        300)];

const shopName = 'iShop2';

ReactDOM.render(
    React.createElement(iShopTable,
        {products:shopProducts, shopName:shopName}),
    document.getElementById('container')
);