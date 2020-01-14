import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return(
    <div className="footer">
    Made with :) in San Francisco, USA
                    <a href="/jobs"> Jobs</a> |
                    <a href="/calculators"> Calculators</a> |
                    <a href="https://blog.splitwise.com">&nbsp;Blog</a> |
                    <a href="/terms">&nbsp;Terms</a> |
                    <a href="/press">&#160;Press</a> |
                    <a href="http://dev.splitwise.com">&#160;API</a> |
                    <a href="/contact">&#160;Contact me</a>
    </div> 
    ) 
}
export default Footer