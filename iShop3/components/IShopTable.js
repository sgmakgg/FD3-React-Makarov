import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './IShopTable.css';
import IShopProduct from "./IShopProduct";
import ProductCardUneditable from "./ProductCardUneditable";
import ProductCardEditable from "./ProductCardEditable";


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
        selectedRowCode: null,
        editProductCardMode: false,
        editingProductCard: null
        };

    rowModification = (code, deleteRow = false) => {
        if(deleteRow)
            this.setState({iShopProducts: this.state.
                iShopProducts.filter(item => item.code !== code),
                    selectedRowCode:(code === this.state.selectedRowCode) ?
                                            null : this.state.selectedRowCode});
        else
            this.setState( {selectedRowCode:code} );
    };

    editProduct = (code) =>{
        this.setState({editProductCardMode:true,
            editingProductCard:this.state.iShopProducts.filter(item =>
                item.code === code)});
    };

    render(){
        let tableHead = <tr className='TableHead'>
                                    <th className='ProductName'>Name</th>
                                    <th className='ProductPrice'>Price</th>
                                    <th className='ProductPhoto'>Photo</th>
                                    <th className='ProductQuantity'>Quantity</th>
                                    <th className='ProductControl'>Control</th>
                                </tr>

        let products = this.state.iShopProducts.map((product, index) =>
            <IShopProduct key={index}
                          name={product.name}
                          price={product.price}
                          imageURL={product.imageURL}
                          warehouseQuantity={product.warehouseQuantity}
                          code={product.code}
                          selectedRowCode={this.state.selectedRowCode}
                          callBackSelectingRow={this.rowModification}
                          callBackDeletingRow={this.rowModification}
                          callbackEditingRow={this.editProduct}/>
        );

        return(
            <Fragment>
                <div className='IShop'>
                    <h1 className='ShopName'>{this.props.shopName }</h1>
                    <table className='IShopTable'>
                        <thead className='IShopTableHead'>{tableHead}</thead>
                        <tbody className='iShopTableBody'>{products}</tbody>
                    </table>
                    <button>{"New\xa0product"}</button>
                </div>
                <div className='ProductCard'>
                    {
                        (this.state.editProductCardMode === true)
                            ?
                            <ProductCardEditable product={this.state.editingProductCard[0]}/>
                            :
                            (this.state.selectedRowCode !== null) &&
                            <ProductCardUneditable product={
                                this.state.iShopProducts.filter(
                                    item => item.code === this.state.selectedRowCode)[0]}/>
                    }
                </div>
            </Fragment>
        );
    };
}

export default IShopTable;



