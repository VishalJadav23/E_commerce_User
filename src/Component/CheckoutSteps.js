import React from 'react';

const CheckoutSteps = (props) => {
    const { signin, shipping, payment, placeorder } = props
    return (
        <div className='container-fluid'>
            <div className="row ">
                <div className="col-3  px-3" style={{ paddingTop: "5px", borderTop: signin ? "3px solid #ff8000" : "3px solid grey" }}>
                    <h5 className='checkoutH5' style={{ color: signin ? "#ff8000" : "gray" }}>Sign in</h5>
                </div>
                <div className="col-3  px-3" style={{ paddingTop: "5px", borderTop: shipping ? "3px solid #ff8000" : "3px solid grey" }}>
                    <h5 className='checkoutH5' style={{ color: shipping ? "#ff8000" : "gray" }}>Shipping</h5>

                </div>
                <div className="col-3  px-3" style={{ paddingTop: "5px", borderTop: payment ? "3px solid #ff8000" : "3px solid grey" }}>
                    <h5 className='checkoutH5' style={{ color: payment ? "#ff8000" : "gray" }}>Payment</h5>

                </div>
                <div className="col-3  px-3" style={{ paddingTop: "5px", borderTop: placeorder ? "3px solid #ff8000" : "3px solid grey" }}>
                    <h5 className='checkoutH5' style={{ color: placeorder ? "#ff8000" : "gray" }}>Place Order</h5>

                </div>
            </div>

        </div>
    );
};

export default CheckoutSteps;