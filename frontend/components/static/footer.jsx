import React from "react";
import styled, { css, keyframes } from "styled-components";


// study distributed systems
// TLS = transport layer security 
// need to lint for style (pref automatically) and rewrite almost everything, this time wiht documentation
// https://github.com/dryruby/rack-throttle to throttle http requests in rails
// pythonanywhere doesnt support memcached -- need to host elsewhere
// need to use hooks like useEffect and useState
// need to put in default propTypes
// if you have an inlineblock parent and you want block divs to NOT flex into one row you must FLOAT and clear
// grid vs flexbox (in one axis, different column widths) vs floating vs table

// http://jsfiddle.net/CvJ3W/5/
// ComponentClass.propTypes = {
  // detail: PropTypes.Bool
// }
// progress bar for use as HP in crono trigger game? https://css-tricks.com/animate-to-an-inline-style/
// SASS examples https://www.sitepoint.com/8-tips-help-get-best-sass/
// <Link> vs <a> benefits are 1. react router's history push/replace, 2. passing any props, 3. automatic e.preventDefault() 

// Pilot testing for using/learning Styled Components in my project
// Benefits: 1. CSS is injected on a need-to basis depending on what compenents are mounted,
// 2.unique class names, 3. easier deletion, 4. automatic vendor compatibility

// 1. Canonical syntax example
// const Title = styled.h1`
//   font-size: 1.5em;
//   text-align: center;
//   color: palevioletred;
// `;

// 2. Functional component is argument to a styled function example
// const Link = ({ className, children }) => (
//   <a className={className}>
//     {children}
//   </a>
// );
// const StyledLink = styled(Link)`
//   color: palevioletred;
//   font-weight: bold;
// `;
// render(
//   <div>
//     <Link>Unstyled, boring Link</Link>
//     <br />
//     <StyledLink>Styled, exciting Link</StyledLink>
//   </div>
// );

// 3. Keyframes example
// const styles = css`
//   animation: ${rotate} 2s linear infinite;
// `
// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// `;


// // Here we create a component that will rotate everything we pass in over two seconds
// const Rotate = styled.div`
//   display: inline-block;
//   animation: ${rotate} 2s linear infinite;
//   padding: 2rem 1rem;
//   font-size: 1.2rem;
// `;
// render(
//   <Rotate>&lt; 💅 &gt;</Rotate>
// );

//because keyframes are globally scoped, we have to import keyframes helper function to which we pass `from{..} to{..}` as a string
// Footer the functional component is what is exported. It forms a closure with const rotate... const Rotate etc. 
// I hope these objects get auto garbage collected on dismount
const rotate = keyframes` 
	0% {transform:rotate(16deg) scale(1.2);}
	50% {transform:rotate(-16deg) scale(1.4);}
	100% {transform:rotate(16deg) scale(1.3);}
  // from {
  //   transform: rotate(-60deg);
  // }

  // to {
  //   transform: rotate(60deg);
  // }
`

const Rotate = styled.a`
  color: ${props => props.color ? props.color : "palevioletred"};
  background-color: ${props => props.background ? props.background : "palevioletred"};
  &:hover {
    color: #5BC5A7;
    animation: ${rotate} 1s ease-in infinite;
  }
`

// const styles = css`
//   animation: ${rotate} 2s linear infinite;
// `

// const Link = ({ className, children }) => (
//   <a className={className}>
//     {children}
//   </a>
// );
// const StyledLink = styled(Link)`
//   color: palevioletred;
//   font-weight: bold;
// `;
// render(
//   <div>
//     <Link>Unstyled, boring Link</Link>
//     <br />
//     <StyledLink>Styled, exciting Link</StyledLink>
//   </div>
// );

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

`
const Links = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: white;
`


const Footer = () => {

  return (
    <Footerwrapper>

      <Links>
        Made with 🤣 in San Francisco, USA <br/><br/>

        &nbsp;
        <a href="https://github.com/featurerich1/full-stack-project/wiki">
          My design docs
        </a>{" "}
        | &nbsp;<a href="https://github.com/featurerich1/">My Github</a> |
        &nbsp;<a href="https://www.linkedin.com/in/edzhou/">My Linkedin</a> |
        &#160;<a href="http://dev.splitwise.com">Splitwise's API</a> | &#160;
        <a href="mailto:edward@utexas.edu">Email me!</a>

      </Links>

      <Rotate color={`white`} background={`#666`} href={`https://angel.co/u/edward-zhou-7`} className="fa fas fa-angellist fa-3x" target="_blank" rel="noopener" />
      <Rotate color={`white`} background={`#666`} href={`https://linkedin.com/edzhou/`} className="fa fa-linkedin fas fa-3x" target="_blank" rel="noopener" />
      <Rotate color={`white`} background={`#666`} href={`https://github.com/featurerich1/`} className="fa fa-github fas fa-3x" target="_blank" rel="noopener" /> 
    </Footerwrapper >
  );
};

export default Footer;
