let iShopBody = React.createClass({

    displayName: 'iShopTableBodyComponent',

    propTypes: {
        products: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired, 
                price: React.PropTypes.number.isRequired, 
                imageURL: React.PropTypes.string.isRequired, 
                warehouseQuantity: React.PropTypes.number.isRequired, 
                code: React.PropTypes.number.isRequired
            })
        )
    },

    render: function(){

        let products = [];
        products = this.props.products.map(product =>
            React.DOM.tr({key:product.code, className:'tableBody'},
                React.DOM.td({className:'productName'}, product.name),
                React.DOM.td({className:'productPrice'}, product.price),
                React.DOM.td({className:'productPhoto'}, 
                    React.DOM.img({src:product.imageURL, alt:product.name, className:'rowImage'})),
                React.DOM.td({className:'productQuantity'}, product.warehouseQuantity))
            );

        return  React.DOM.tbody({className:'iShopTableBody'}, products);
    },
});



