import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return(
    <div className="footer">
    Made with :( in San Francisco, USA
                    <a href="/jobs">Jobs</a> |
                    <a href="/calculators">Calculators</a> |
                    <a href="https://blog.splitwise.com">Blog</a> |
                    <a href="/terms">Terms</a> |
                    <a href="/press">Press</a> |
                    <a href="http://dev.splitwise.com">API</a> |
                    <a href="/contact">Contact me</a>
    </div> 
    ) 
}
export default Footer