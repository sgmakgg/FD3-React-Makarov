import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import './UneditableProductCard.css';

const UneditableProductCard = props => {
    return <Fragment>
                <h1>{props.product.name}</h1>
                <p>{props.product.name}</p>
                <p>{'Price\u003A\xa0' + props.product.price}</p>
            </Fragment>
};

UneditableProductCard.propTypes = {
        product: PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            imageURL: PropTypes.string.isRequired,
            warehouseQuantity: PropTypes.number.isRequired,
            code: PropTypes.number.isRequired
        })
    };

export default UneditableProductCard;