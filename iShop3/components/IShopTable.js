import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './IShopTable.css';
import IShopProduct from "./IShopProduct";


class IShopTable extends React.Component{

    static propTypes = {
        shopName: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                imageURL: PropTypes.string.isRequired,
                warehouseQuantity: PropTypes.number.isRequired,
                code: PropTypes.number.isRequired
            })
        )
    };

    state = {
        iShopProducts: this.props.products,
        selectedRowCode: null
        };

    rowModification = (code, deleteRow = false) => {
        if(deleteRow)
            this.setState({iShopProducts: this.state.
                iShopProducts.filter(item => item.code !== code)});
        else
            this.setState( {selectedRowCode:code} );
    };

    render(){

        let tableHead = 
            DOM.tr({className:'tableHead'},
                DOM.th({className:'productName'}, 'Name'),
                DOM.th({className:'productPrice'}, 'Price'),
                DOM.th({className:'productPhoto'}, 'Photo'),
                DOM.th({className:'productQuantity'}, 'Warehouse'),
                DOM.th({className:'productControl'}, 'Control'));

        let products = this.state.iShopProducts.map((product, index) =>
            React.createElement(IShopProduct,
                {key: index,
                name: product.name, 
                price: product.price, 
                imageURL: product.imageURL,
                warehouseQuantity: product.warehouseQuantity,
                code: product.code,
                selectedRowCode: this.state.selectedRowCode,
                callBackSelectedRow: this.rowModification,
                callBackDeleteRow: this.rowModification
            })
        );

        return DOM.div({className:'IShop'},
            DOM.h1( {className: 'ShopName'}, this.props.shopName ),
            DOM.table( {className:'iShopTable'},
                DOM.thead({className:'iShopTableHead'}, tableHead),
                DOM.tbody({className:'iShopTableBody'}, products)),
        );
    };
}

export default IShopTable;



