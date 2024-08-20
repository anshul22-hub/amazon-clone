import React, { useEffect } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from "./firebase";
import Orders from './Orders';


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
     

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setCientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setCientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('The Secret is >>>' , clientSecret)
    console.log('👱', user)

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmati

            db
              .collection('users')
              .doc(user?.uid)
              .collection('Orders')
              .doc(paymentIntent.id)
              .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.amount
               })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch ({
                type: 'Empty_basket'
            })

            history.replace('/orders')
        })

    }
 
    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }


  return (
    <div className='payment'>

        <div className='payment_container'>
            <h1>
                Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                )
            </h1>

            <div className='payment_section'>
                <div className='payment_tital'>
                    <h3>
                        Delivery Address
                    </h3>
                </div>
                <div className='payment_address'>
                    <p>
                        {user?.email}
                    </p>
                    <p>19 Knowledage Park-2, NIET</p>
                    <p>Greater Noida, UP.</p>
                </div>
            </div>

            <div className='payment_section'>
                <div className='payment_tital'>
                    <h3>
                        Review item and Delivery
                    </h3>
                </div>
                <div className='payment_item'>
                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            <div className='payment_section'>
                <div className='payment_tital'>
                    <h3>
                        Payment Method
                    </h3>
                </div>
                <div className='payment_details'>
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        <div className='payment_priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />

                            <button disabled={processing || disabled || succeeded}>
                                <span>
                                   {processing ? <p>Processing</p> : "Buy Now"}
                                </span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment