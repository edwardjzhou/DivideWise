import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers/root_reducer";

const configureStore = (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));

export default configureStore;


// so at this point, dispatch is provided by connect(mstp,mdtp) from react-redux lib
// we're in component file 
// this.props.fetchBill = (data) => dispatch(fetchBill(data))
// this.props.fetchBill(data) = dispatch(fetchBill(data)) AND dispatch is  called w fetchbill(data) passed in 
// the action fetchBill is (data) => (dispatch) => API.fetch({}).then(ans=> dispatch(receive(ans)) ) 
// so atm it needs access to stores dispatch but thunk as middleware takes the action function and gives it (dispatch, [,getState]) 
// after hte promise resolves then the then() fires dispatch again to pass a normal action which hits the reducer its meant for 
