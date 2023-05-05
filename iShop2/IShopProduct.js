let iShopProduct = React.createClass({

    displayName: 'iShopProductComponent',

    propTypes: {
        name: React.PropTypes.string.isRequired, 
        price: React.PropTypes.number.isRequired, 
        imageURL: React.PropTypes.string.isRequired, 
        warehouseQuantity: React.PropTypes.number.isRequired, 
        code: React.PropTypes.number.isRequired,
        selectedRowCode: React.PropTypes.number,
        callBackSelectedRow: React.PropTypes.func.isRequired,
        callBackDeleteRow: React.PropTypes.func.isRequired
    },

    rowSelected: function(EO){
        this.props.callBackSelectedRow(this.props.code);
    },

    deleteRow: function(EO){
        EO.stopPropagation();
        if(confirm('Would you like to delete?'))
            this.props.callBackDeleteRow(this.props.code, true);
    },

    render: function(){

        return React.DOM.tr({key: this.props.code, 
                            className:'iShopProduct', 
                            onClick: this.rowSelected, 
                            style: {background: 
                                (this.props.selectedRowCode === this.props.code) ? 'red' : 'white'}},
        React.DOM.td({className:'productName'}, this.props.name),
        React.DOM.td({className:'productPrice'}, this.props.price),
        React.DOM.td({className:'productPhoto'}, 
            React.DOM.img({src:this.props.imageURL, 
                alt:this.props.name, className:'rowImage'})),
        React.DOM.td({className:'productQuantity'}, this.props.warehouseQuantity),
        React.DOM.td({className:'productDelete'}, 
            React.DOM.button({onClick: this.deleteRow}, 'Delete'))
        );
    },
});