// https://www.w3schools.com/howto/default.asp
// THIS TEACHES YOU ALL THE HTML ELEMENTS LIKE accordions (HAD so much trouble figuring out what it was called), dropdowns
// go here first.

// monolithic app needs to have resuable components like given an array of objects i always just want to list it out
// but i have weird html and css problems 

// biz logic in the page not the underlying components. so the wrapper for the page should have it and provides
// Q: does this mean that given you are logged in in dividewise. you will be seeing my dashboard wrapper
// all biz logic and subscrioptions should be to the wrapper?

//gridify and remove floats for cols. too difficult to work with https://css-tricks.com/snippets/css/complete-guide-grid/

import React from "react";
import {
//   Route,
//   Redirect,
  Switch,
//   Link,
//   NavLink,
//   HashRouter,
} from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import Splash from "./static/splash";
import Dashboard from "./dashboard/dashboard";
import Modal from "./modal/modal";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');


class App extends React.Component {
  render() {
    return (
      <>
        <Elements stripe={stripePromise}>
          <Modal />
          <Switch>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/friends/:friendId" component={Dashboard} /> 
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute path="/" component={Splash} />
          </Switch>
        </Elements>
      </>
    );
  }
}

export default App;





// import React from "react";
// //stripe-js
// import { loadStripe } from '@stripe/stripe-js';

// //react-stripe-js
// import { CardElement, useElements, useStripe, } from '@stripe/react-stripe-js';
// import { Elements } from '@stripe/react-stripe-js';


// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

// const MyCheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     // Block native form submission.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }

//     // Get a reference to a mounted CardElement. Elements knows how
//     // to find your CardElement because there can only ever be one of
//     // each type of element.
//     const cardElement = elements.getElement(CardElement);

//     // Use your card Element with other Stripe.js APIs
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };


// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) => {
//     // Block native form submission.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }

//     // Get a reference to a mounted CardElement. Elements knows how
//     // to find your CardElement because there can only ever be one of
//     // each type of element.
//     const cardElement = elements.getElement(CardElement);

//     // Use your card Element with other Stripe.js APIs
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// const App = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       {/* <CheckoutForm /> */}
//       <MyCheckoutForm />

//     </Elements>
//   );
// };
// export default App































// import Comments from "./dashboard/comments";
// import Comments, { OMG, Test } from './dashboard/comments';

// class App extends React.Component {
//   render() {
//     return (
//       <>
//       <Test/>
//         {/* <Comments/>
//         <OMG></OMG> */}
//       </>
//     )
//   }
// }
// export default App;


// For example, rather than just connecting a < UserList > component and reading the entire array of users, 
// have < UserList > retrieve a list of all user IDs, render list items as <UserListItem userId = { userId }>, 
// and have < UserListItem > be connected and extract its own user entry from the store.


//redux is for 1. GLOBAL/shared components 2. values need caching 3. GRANULARITY FOR CHILDREN
// use styco for styled components just installed addon in vscode
//https://www.reddit.com/r/reactjs/comments/ghmrbg/a_vscode_extension_to_refactor_htmltags_with/

// mstp happens after dispatch but not immediatley after 
