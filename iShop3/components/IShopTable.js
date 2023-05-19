import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './IShopTable.css';
import IShopProduct from "./IShopProduct";
import ProductCardUneditable from "./ProductCardUneditable";
import ProductCardEditable from "./ProductCardEditable";
import {changeCardPropsEvents, isEditing} from "../ProductCardEditableEvents";


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
        editingProductCard: null,
        addNewProduct: false,
        buttonsDisabled:false
        };

    componentDidMount() {
        changeCardPropsEvents.addListener(isEditing, this.disableButtons);
    };

    componentWillUnmount() {
        changeCardPropsEvents.removeListener(isEditing, this.disableButtons);
    };

    disableButtons = (flag) => {
        this.setState({buttonsDisabled:flag});
    };

    rowModification = (code, deleteRow = false) => {
        if(deleteRow)
            this.setState({iShopProducts: this.state.
                iShopProducts.filter(item => item.code !== code),
                    selectedRowCode:(code === this.state.selectedRowCode) ?
                                            null : this.state.selectedRowCode});
        else{
            if(!this.state.buttonsDisabled){
                this.setState( {selectedRowCode:code,
                    addNewProduct: false,
                    editProductCardMode: false} );
            }
        }
    };

    editProduct = (code) =>{
            this.editProductStateUpdate(code);
    };

    editProductStateUpdate =(code)=>{
        let array = this.state.iShopProducts.filter(item =>
            item.code === code);
        this.setState({editProductCardMode:true,
            editingProductCard:array,
            addNewProduct:false,
            selectedRowCode:null});
    };

    addNewProduct = () =>{
        this.setState({addNewProduct:true,
                            editProductCardMode:false,
                            selectedRowCode:null});
    };

    saveProduct = (product) =>{
        let array = this.state.iShopProducts.slice();
        array.push(product);
        this.setState({iShopProducts: array}, this.backToMainPage)
    };

    updateProduct = (product) =>{
        let array = this.state.iShopProducts.slice();
        array.forEach((item,index) =>{
            if(item.code === product.code) {
                array[index] = product;
            }
        });
        this.setState({iShopProducts: array}, this.backToMainPage)
    };

    backToMainPage = () =>{
        this.setState({editProductCardMode: false,
            editingProductCard: null,
            addNewProduct: false,
            selectedRowCode:null})
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

        const emptyProduct = {
            name: 'add product name',
            price: 0.00,
            imageURL: 'add URL',
            warehouseQuantity: 0,
            code: 1};

        return(
            <Fragment>
                <div className='IShop'>
                    <h1 className='ShopName'>{this.props.shopName }</h1>
                    <table className='IShopTable'>
                        <thead className='IShopTableHead'>{tableHead}</thead>
                        <tbody className='iShopTableBody'>{products}</tbody>
                    </table>
                    <button onClick={this.addNewProduct} disabled={this.state.buttonsDisabled}>{"New\xa0product"}</button>
                </div>
                <div className='ProductCard'>
                    {
                        (this.state.addNewProduct === true)
                            ?
                            <ProductCardEditable product={emptyProduct}
                                                 isNewProductAdding={this.state.addNewProduct}
                                                 callBackSaveProduct={this.saveProduct}
                                                 callBackUpdateProduct={this.updateProduct}
                                                 callBackCancelModification={this.backToMainPage}
                                                 key='1'/>
                            :
                        (this.state.editProductCardMode === true)
                            ?
                            <ProductCardEditable product={this.state.editingProductCard[0]}
                                                 isNewProductAdding={this.state.addNewProduct}
                                                 callBackSaveProduct={this.saveProduct}
                                                 callBackUpdateProduct={this.updateProduct}
                                                 callBackCancelModification={this.backToMainPage}
                                                 key='2'/>
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



