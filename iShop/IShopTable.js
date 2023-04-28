let iShop = React.createClass({

    displayName: 'iShopComponentDisplayName',

    propTypes: {
        shopName: React.PropTypes.string.isRequired,
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

        let tableHead = 
            React.DOM.tr({className:'tableHead'},
                React.DOM.th({className:'productName'}, 'Name'),
                React.DOM.th({className:'productPrice'}, 'Price'),
                React.DOM.th({className:'productPhoto'}, 'Photo'),
                React.DOM.th({className:'productQuantity'}, 'Warehouse'));

        let products = [];
        products = this.props.products.map(product =>
            React.DOM.tr({key:product.code, className:'tableBody'},
                React.DOM.td({className:'productName'}, product.name),
                React.DOM.td({className:'productPrice'}, product.price),
                React.DOM.td({className:'productPhoto'}, 
                    React.DOM.img({src:product.imageURL, alt:product.name, className:'rowImage'})),
                React.DOM.td({className:'productQuantity'}, product.warehouseQuantity))
            );

        return React.DOM.div({className:'IShopTable'},
            React.DOM.h1( {className: 'ShopName'}, this.props.shopName ),
            React.DOM.table( {className:'iShopTable'}, 
                React.DOM.thead({className:'tableHead'}, tableHead),
                React.DOM.tbody({className:'tableBody'}, products)),
        );
    },
});



