import React, {Fragment} from "react";
import PropTypes from "prop-types";

class ProductCardEditable extends React.Component{

    static propTypes = {
        product: PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            imageURL: PropTypes.string.isRequired,
            warehouseQuantity: PropTypes.number.isRequired,
            code: PropTypes.number.isRequired
        })
    };

    state ={
        name: this.props.product.name,
        price: this.props.product.price,
        imageURL: this.props.product.imageURL,
        warehouseQuantity: this.props.product.warehouseQuantity,
        code: this.props.product.code,
        isEditing: true,
        isSavingDisabled: false
    };

    isEditing = (EO) => {
        if(EO.target.value === '')
            this.setState({isEditing:false});
        else
            this.setState({isEditing:true});
    };

    isSavingDisabled = (EO) =>{
        if(EO.target.value === '')
            this.setState({isSavingDisabled:true});
        else
            this.setState({isSavingDisabled:false});
    };

    setProductName = (EO) =>{
        this.isEditing(EO);
        this.isSavingDisabled(EO);
        this.setState({name:EO.target.value.toString()});
    };

    setProductPrice = (EO) =>{
        this.isEditing(EO);
        this.isSavingDisabled(EO);
        this.setState({price:parseInt(EO.target.value)});
    };

    setProductURL = (EO) =>{
        this.isEditing(EO);
        this.isSavingDisabled(EO);
        this.setState({imageURL:EO.target.value.toString()});
    };

    setWarehouseQuantity = (EO) =>{
        this.isEditing(EO);
        this.isSavingDisabled(EO);
        this.setState({warehouseQuantity:parseInt(EO.target.value)});
    };

    render(){
        return(
            <Fragment>
                <h1>ID: {this.props.product.code}</h1>
                <form>
                    <label>{'Name:\xa0'}
                        <input type='text'
                               name='name'
                               defaultValue={this.props.product.name}
                               onChange={this.setProductName}/>
                        {
                            (this.state.name === "") &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be string</span>
                        }
                    </label><br/>
                    <label>{'Price:\xa0'}
                        <input type='text'
                               name='price'
                               defaultValue={this.props.product.price}
                               onChange={this.setProductPrice}/>
                        {
                            (isNaN(this.state.price)) &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be number</span>
                        }
                    </label><br/>
                    <label>{'URL:\xa0'}
                        <input type='text'
                               name='imageURL'
                               defaultValue={this.props.product.imageURL}
                               onChange={this.setProductURL}/>
                        {
                            (this.state.imageURL === "") &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be string</span>
                        }
                    </label><br/>
                    <label>{'Quantity:\xa0'}
                        <input type='text'
                               name='warehouseQuantity'
                               defaultValue={this.props.product.warehouseQuantity}
                               onChange={this.setWarehouseQuantity}/>
                        {
                            (isNaN(this.state.warehouseQuantity)) &&
                            <span style={{color: 'red'}}>Please, fill the field. It must be string</span>
                        }
                    </label><br/>
                    <input type='button' value='Save' disabled={this.state.isSavingDisabled}/>
                    <input type='button' value='Cancel'/>
                </form>
            </Fragment>
        )
    };
}

export default ProductCardEditable;