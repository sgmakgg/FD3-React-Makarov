let iShopTable = React.createClass({

    displayName: 'iShopTableComponent',

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

    getInitialState: function() {
        return { 
            iShopProducts: this.props.products,
            selectedRowCode: null
        };
    },

    rowModification: function(code, deleteRow = false) {
        if(deleteRow)
            this.setState({iShopProducts: this.state.iShopProducts.filter(item => item.code !== code)});
        else
            this.setState( {selectedRowCode:code} );
    },

    render: function(){

        let tableHead = 
            React.DOM.tr({className:'tableHead'},
                React.DOM.th({className:'productName'}, 'Name'),
                React.DOM.th({className:'productPrice'}, 'Price'),
                React.DOM.th({className:'productPhoto'}, 'Photo'),
                React.DOM.th({className:'productQuantity'}, 'Warehouse'),
                React.DOM.th({className:'productControl'}, 'Control'));

        let products = [];
        products = this.state.iShopProducts.map((product, index) =>
            React.createElement(iShopProduct,
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

        return React.DOM.div({className:'IShop'},
            React.DOM.h1( {className: 'ShopName'}, this.props.shopName ),
            React.DOM.table( {className:'iShopTable'}, 
                React.DOM.thead({className:'iShopTableHead'}, tableHead),
                React.DOM.tbody({className:'iShopTableBody'}, products)),
        );
    },
});



