import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../Component/CheckoutSteps";
import { useState } from "react";

export default function PaymentScreen() {
    const navigate = useNavigate()
    let [paymentMethod, setPaymentMethod] = useState("online")

    const payment = () => {
        navigate(`/placeorder?paymentMethod=${paymentMethod}`)
        return;
    }


    return (
        <div className="container py-5 ">
            <CheckoutSteps signin={true} shipping={true} payment={true} />
            <div className="row d-flex justify-content-center">

                <div className="col-md-8 col-lg-6 mt-5 col-xl-4">
                    <div className="card rounded-3 shadow-lg">
                        <div className="card-body mx-3 my-2 ">
                            <h5 className="text-center">Payment Method</h5>

                            <div className="pt-3">
                                <div className="rounded border d-flex w-100 px-3 py-2  align-items-center">
                                    <div className="payment d-flex align-items-center pe-3">
                                        <input className="" type="radio" id="online" checked={paymentMethod === "online"}
                                            value={"online"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            name="flexRadioDefault" />
                                        <label className="mb-1 fw-bold text-primary" htmlFor="online">online</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row pb-3 pt-4">
                                    <div className="rounded border d-flex w-100 px-3 py-2 align-items-center">
                                        <div className="payment d-flex align-items-center pe-3">
                                            <input className="border-none" id="cod" type="radio" checked={paymentMethod === "cod"}
                                                value={"cod"}
                                                onChange={(e) => setPaymentMethod(e.target.value)} name="flexRadioDefault" />
                                            <label className="mb-1 fw-bold text-primary" htmlFor="cod">cod</label>
                                        </div>

                                    </div>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-primary" onClick={payment}>Continue</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}