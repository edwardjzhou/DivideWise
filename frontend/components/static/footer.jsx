import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      Made with :) in San Francisco, USA
      <div className="links">
        &nbsp;
        <a href="https://github.com/featurerich1/full-stack-project/wiki">
          My design docs
        </a>{" "}
        | &nbsp;<a href="https://github.com/featurerich1/">My Github</a> |
        &nbsp;<a href="https://www.linkedin.com/in/edzhou/">My Linkedin</a> |
        &#160;<a href="http://dev.splitwise.com">Splitwise's API</a> | &#160;
        <a href="mailto:edward@utexas.edu">Email me!</a>
      </div>
    </div>
  );
};
export default Footer;
