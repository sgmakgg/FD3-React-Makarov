let iShopVariable = React.createClass({

    displayName: 'iShopComponentDisplayName',

    render: function(){

        let products = [];
        let tableFirstRow = 
            React.DOM.tr({className:'tableHead'},
                React.DOM.th({className:'productName'}, 'Name'),
                React.DOM.th({className:'productPrice'}, 'Price'),
                React.DOM.th({className:'productPhoto'}, 'Photo'),
                React.DOM.th({className:'productQuantity'}, 'Warehouse'));

        products = this.props.products.map(product =>
            React.DOM.tr({key:product.code, className:'tableBody'},
                React.DOM.td({className:'productName'}, product.name),
                React.DOM.td({className:'productPrice'}, product.price),
                React.DOM.td({className:'productPhoto'}, 
                    React.DOM.img({src:product.imageURL, alt:product.name, className:'rowImage'})),
                React.DOM.td({className:'productQuantity'}, product.warehouseQuantity))
            );
// 
        products.splice(0, 0, tableFirstRow);

        return React.DOM.div({className:'iShop'},
            React.DOM.h1( {className: 'ShopName'}, this.props.shopName ),
            React.DOM.table( {className:'iShopTable'}, products ),
        );
    },

});



