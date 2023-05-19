import React, {Fragment} from "react";
import PropTypes from "prop-types";

import {changeCardPropsEvents, isEditing} from "../ProductCardEditableEvents";

class ProductCardEditable extends React.Component{

    static propTypes = {
        product: PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            imageURL: PropTypes.string.isRequired,
            warehouseQuantity: PropTypes.number.isRequired,
            code: PropTypes.number.isRequired,
        }),
        isNewProductAdding: PropTypes.bool,
        callBackSaveProduct: PropTypes.func.isRequired,
        callBackUpdateProduct: PropTypes.func.isRequired,
        callBackCancelModification: PropTypes.func.isRequired
    };

    state ={
        name: this.props.product.name,
        price: this.props.product.price,
        imageURL: this.props.product.imageURL,
        warehouseQuantity: this.props.product.warehouseQuantity,
        code: this.props.product.code,
        isEditing: true,
        isSavingDisabled: false,
        addNewProduct: this.props.isNewProductAdding
    };

    componentDidMount() {
        if(this.props.isNewProductAdding)
            this.setState({isSavingDisabled:true});
    };

    componentWillUnmount() {
        changeCardPropsEvents.emit(isEditing, false);
    };

    static getDerivedStateFromProps(props, state){
        if(!state.addNewProduct){
            if(props.product.code !== state.code){
                return{
                    code:props.product.code,
                    name:props.product.name,
                    price:props.product.price,
                    imageURL:props.product.imageURL,
                    warehouseQuantity:props.product.warehouseQuantity
                }
            }
        }
        return null;
    };

    isEditing = (EO) => {
        if(EO.target.value === '')
            this.setState({isEditing:false});
        else
            this.setState({isEditing:true});

        changeCardPropsEvents.emit(isEditing, true);
    };

    isSavingDisabled = (EO) =>{
        if(EO.target.value === '' || EO.target.value === 0 || isNaN(EO.target.value))
            this.setState({isSavingDisabled:true});
        else
            this.setState({isSavingDisabled:false});
    };

    checkStateProductProps = () =>{
        const save =  (this.state.name !== '' &&
            this.state.price !== 0 && !isNaN(this.state.price) &&
            this.state.imageURL !== '' &&
            this.state.warehouseQuantity !== 0 && !isNaN(this.state.warehouseQuantity)&&
            this.state.code !== 0 && !isNaN(this.state.code));
        if(!save)
            this.setState({isSavingDisabled:true});
        else if(save)
            this.setState({isSavingDisabled:false});
    };

    setProductName = (EO) =>{
        this.isEditing(EO);
        this.isSavingDisabled(EO);
        this.setState({name:EO.target.value.toString()}, this.checkStateProductProps);
    };

    setProductPrice = (EO) =>{
        this.isEditing(EO);
        this.isSavingDisabled(EO);
        this.setState({price:parseFloat(EO.target.value)}, this.checkStateProductProps);
    };

    setProductURL = (EO) =>{
        this.isEditing(EO);
        this.isSavingDisabled(EO);
        this.setState({imageURL:EO.target.value.toString()}, this.checkStateProductProps);
    };

    setProductCode = (EO) =>{
        this.isEditing(EO);
        this.isSavingDisabled(EO);
        this.setState({code:parseInt(EO.target.value)}, this.checkStateProductProps);
    };

    setWarehouseQuantity = (EO) =>{
        this.isEditing(EO);
        this.isSavingDisabled(EO);
        this.setState({warehouseQuantity:parseInt(EO.target.value)}, this.checkStateProductProps);
    };

    saveItem = () => {
        let product = {
            name: this.state.name,
            price: this.state.price,
            imageURL: this.state.imageURL,
            warehouseQuantity: this.state.warehouseQuantity,
            code: this.state.code};
        this.props.callBackSaveProduct(product);
    };

    updateItem = () => {
        let product = {
            name: this.state.name,
            price: this.state.price,
            imageURL: this.state.imageURL,
            warehouseQuantity: this.state.warehouseQuantity,
            code: this.state.code};
        this.props.callBackUpdateProduct(product);
    };

    cancelModification = () =>{
        this.props.callBackCancelModification();
    };

    debounceSerie = (func,interval,immediate) => {
        let timer;
        return function() {
            let context=this, args=arguments;
            let later=function() {
                timer=null;
                if ( !immediate )
                    func.apply(context,args);
            };
            let callNow=immediate&&!timer;
            clearTimeout(timer);
            timer=setTimeout(later,interval);
            if ( callNow )
                func.apply(context,args);
        };
    };

    render(){
        const editableForm =
            <Fragment>
                <h1>{'Edit\xa0existing\xa0product'}</h1>
                <form>
                    <label>{'ID:\xa0' + this.props.product.code}</label><br/>
                    <label>{'Name:\xa0'}
                        <input type='text'
                               name='name'
                               defaultValue={this.props.product.name}
                               onKeyUp={this.debounceSerie(
                                        this.setProductName,
                                        500, false)}
                               key={this.props.product.name}/>
                        {
                            (this.state.name === "") &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be string</span>
                        }
                    </label><br/>
                    <label>{'Price:\xa0'}
                        <input type='text'
                               name='price'
                               defaultValue={this.props.product.price}
                               onKeyUp={this.debounceSerie(
                                        this.setProductPrice,
                                       500, false)}
                               key={this.props.product.price}/>
                        {
                            (isNaN(this.state.price)) &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be number</span>
                        }
                    </label><br/>
                    <label>{'URL:\xa0'}
                        <input type='text'
                               name='imageURL'
                               defaultValue={this.props.product.imageURL}
                               onKeyUp={this.debounceSerie(
                                   this.setProductURL,
                                   500, false)}
                               key={this.props.product.imageURL}/>
                        {
                            (this.state.imageURL === "") &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be string</span>
                        }
                    </label><br/>
                    <label>{'Quantity:\xa0'}
                        <input type='text'
                               name='warehouseQuantity'
                               defaultValue={this.props.product.warehouseQuantity}
                               onKeyUp={this.debounceSerie(
                                   this.setWarehouseQuantity,
                                   500, false)}
                               key={this.props.product.warehouseQuantity}/>
                        {
                            (isNaN(this.state.warehouseQuantity)) &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be number</span>
                        }
                    </label><br/>
                    <input type='button' value='Save'
                           disabled={this.state.isSavingDisabled}
                           onClick={this.updateItem}/>
                    <input type='button' value='Cancel'
                            onClick={this.cancelModification}/>
                </form>
            </Fragment>
        const newProductForm =
            <Fragment>
                <h1>{'Add\xa0new\xa0product'}</h1>
                <form>
                    <label>{'Code:\xa0'}
                        <input type='text'
                               name='code'
                               defaultValue={this.props.product.code}
                               onKeyUp={this.debounceSerie(
                                   this.setProductCode,
                                   500, false)}/>
                        {
                            (isNaN(this.state.code) || this.state.code === this.props.product.code) &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be number</span>
                        }
                    </label><br/>
                    <label>{'Name:\xa0'}
                        <input type='text'
                               name='name'
                               defaultValue={this.props.product.name}
                               onKeyUp={this.debounceSerie(
                                   this.setProductName,
                                   500, false)}/>
                        {
                            (this.state.name === "" || this.state.name === this.props.product.name) &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be string</span>
                        }
                    </label><br/>
                    <label>{'Price:\xa0'}
                        <input type='text'
                               name='price'
                               defaultValue={this.props.product.price}
                               onKeyUp={this.debounceSerie(
                                   this.setProductPrice,
                                   500, false)}/>
                        {
                            (isNaN(this.state.price) || this.state.price === this.props.product.price) &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be number</span>
                        }
                    </label><br/>
                    <label>{'URL:\xa0'}
                        <input type='text'
                               name='imageURL'
                               defaultValue={this.props.product.imageURL}
                               onKeyUp={this.debounceSerie(
                                   this.setProductURL,
                                   500, false)}/>
                        {
                            (this.state.imageURL === "" || this.state.imageURL === this.props.product.imageURL) &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be string</span>
                        }
                    </label><br/>
                    <label>{'Quantity:\xa0'}
                        <input type='text'
                               name='warehouseQuantity'
                               defaultValue={this.props.product.warehouseQuantity}
                               onKeyUp={this.debounceSerie(
                                   this.setWarehouseQuantity,
                                   500, false)}/>
                        {
                            (isNaN(this.state.warehouseQuantity) || this.state.warehouseQuantity === this.props.product.warehouseQuantity) &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be number</span>
                        }
                    </label><br/>
                    <input type='button' value='Save'
                           disabled={this.state.isSavingDisabled}
                           onClick={this.saveItem}/>
                    <input type='button' value='Cancel'
                           onClick={this.cancelModification}/>
                </form>
            </Fragment>

        if(this.props.isNewProductAdding)
        {
            return(newProductForm);
        }
        else
            return(editableForm);
    };
}

export default ProductCardEditable;