import React from "react";
import styled, {  keyframes } from "styled-components";


const rotate = keyframes` 
	0% {transform:rotate(16deg) scale(1.2);}
	50% {transform:rotate(-16deg) scale(1.4);}
	100% {transform:rotate(16deg) scale(1.3);}
  
`;

const Rotate = styled.a`
  color: ${(props) => (props.color ? props.color : "palevioletred")};
  background-color: ${(props) =>
    props.background ? props.background : "palevioletred"};
  &:hover {
    color: #5bc5a7;
    animation: ${rotate} 1s ease-in infinite;
  }
`;

const Footerwrapper = styled.div`
  padding: 20px;
  min-height: 74px;
  position: static;
  z-index: 50;
  background: #666;
  color: #fff;
  font-size: 14px;
  text-shadow: 0 -1px 0 #000000;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const Links = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: white;
`;

const Footer = () => {
  return (
    <Footerwrapper>
      <Links>
        Made with 🤣 in San Francisco, USA <br />
        <br />
        &nbsp;
        <a href="https://github.com/featurerich1/full-stack-project/wiki">
          My design docs
        </a>{" "}
        | &nbsp;<a href="https://github.com/featurerich1/">My Github</a> |
        &nbsp;<a href="https://www.linkedin.com/in/edzhou/">My Linkedin</a> |
        &#160;<a href="http://dev.splitwise.com">Splitwise's API</a> | &#160;
        <a href="mailto:edward@utexas.edu">Email me!</a>
      </Links>

      <Rotate
        color={`white`}
        background={`#666`}
        href={`https://angel.co/u/edward-zhou-7`}
        className="fa fas fa-angellist fa-3x"
        target="_blank"
        rel="noopener"
      />
      <Rotate
        color={`white`}
        background={`#666`}
        href={`https://linkedin.com/in/edzhou/`}
        className="fa fa-linkedin fas fa-3x"
        target="_blank"
        rel="noopener"
      />
      <Rotate
        color={`white`}
        background={`#666`}
        href={`https://github.com/featurerich1/`}
        className="fa fa-github fas fa-3x"
        target="_blank"
        rel="noopener"
      />
    </Footerwrapper>
  );
};

export default Footer;
