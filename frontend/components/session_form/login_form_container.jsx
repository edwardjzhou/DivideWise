import { connect } from "react-redux";
import { login , signup, edwardAUTH } from "../../actions/session_actions";
import LoginForm from "./login_form";


const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    formType: "login", // this isnt from the store but a hard definition we give a normal prop
    attempting_login: state.session.attempting_login // false i made the defaultArg state set a explicit boolean for this so no need for || false
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user)),
    edwardAUTH: (id_token, email) => dispatch(edwardAUTH(id_token,email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
