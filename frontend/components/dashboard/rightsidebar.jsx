import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchBills, fetchBill } from "../../actions/bill_actions";
import { NavLink, Link, Route, Switch } from "react-router-dom";
import Friends from "./friends";
import { logout } from "../../actions/session_actions";
import styled from 'styled-components';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
      </button>
        </form>
    );
};


export default class RightSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
        <div className={this.props.className} style={{width: `40%`, marginLeft: `50px`}} >
            <h4>DIVIDEWISE ON THE GO</h4>
            Pay for premium and add IOUs from anywhere:
            <CheckoutForm></CheckoutForm>
        </div>
        )
    }
}
