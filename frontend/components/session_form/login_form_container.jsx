import { connect } from "react-redux";
import { login , signup, edwardAUTH } from "../../actions/session_actions";
import LoginForm from "./login_form";


const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "login",
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
