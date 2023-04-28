let iShopTable = React.createClass({

    displayName: 'iShopTableComponent',

    propTypes: {
        shopName: React.PropTypes.string.isRequired,
    },

    render: function(){

        let tableHead = 
            React.DOM.tr({className:'tableHead'},
                React.DOM.th({className:'productName'}, 'Name'),
                React.DOM.th({className:'productPrice'}, 'Price'),
                React.DOM.th({className:'productPhoto'}, 'Photo'),
                React.DOM.th({className:'productQuantity'}, 'Warehouse'));

        return React.DOM.div({className:'IShop'},
            React.DOM.h1( {className: 'ShopName'}, this.props.shopName ),
            React.DOM.table( {className:'iShopTable'}, 
                React.DOM.thead({className:'iShopTableHead'}, tableHead),
                React.createElement(iShopBody, {products: this.props.products})),
        );
    },
});



