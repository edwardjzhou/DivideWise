// TBD:
// 1. use the SVGs from the real splitwise in my splash
// 2. add comments iwth the display none dropdown
// 3. fix friends component from overflowing outside of its box so i can get a better height matching from all columns overflow:scroll?
// 4. finish add friends form with <datalist id="ice-cream-flavors">
{/* <option value="Chocolate">
  <option value="Coconut">
    <option value="Mint">
      <option value="Strawberry">
        <option value="Vanilla">
</datalist> */}


// TO make the dropdown comments component:
// 1. DISPLAY NONE?
// OR:
// .hide { height: 0; overflow: hidden } 
// .show { min-height: 300px, flex-direction: column}

// .active {color: #5bc5a7;
// border - left: 6px solid #5bc5a7;
// font - weight: 700;}



import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./app";

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

export default Root;











//the biggest rule is that if setstate is called w no arg OR just passed previousstate
// no render of hte parent happens


// class Parent extends React.Component {
//   constructor(props) { 
//     super(props)
//   }
//   handle() {
//     // this.setState({asdf:5})
//     // this.setState({
//     //   bye:324
//     // })
//     // this.setState(prevState => {
//     //   return prevState
//     // })

//     this.setState(prevstate => { return {...prevstate}})
//     // }) //=> setstate called with an arg it renders parent and children 
//     // this.setState()  // => WHEN setstate is called with no args it only re-renders parent
//     console.log(`parent handled`)
//   }

//   render(){
//     console.log('parent rendered ')

//     return <><div onClick={this.handle.bind(this)}> im the parent </div> 
//        CLICK ME <Middle  /> </>

//   }
// }
// pass a function that controls a variable that i pass down as props so that a child can force his own props to update?
// CustomButton.defaultProps = {
//   color: 'blue'
// };

// class Middle extends React.Component {
//   constructor(props){
//     super(props)
//     // this.state = {hi:5}
//     this.idk = 5
//     this.state = {}
//     this.changeprops = this.changeprops.bind(this)
//   }

//   changeprops(){
//     ++this.idk
//   }

//   handle(){
//     // this.setState({asdf:5})
//     // this.setState({
//     //   bye:324
//     // })
//     // this.setState(prevState => {
//     //   return prevState
//     // })

//     // this.props = {[Date.now()]:Date.now()}
//     this.setState(prevstate=> prevstate)
//     // }) //=> setstate called with an arg it renders parent and children 
//     // this.setState()  // => WHEN setstate is called with no args OR the state POJO is the same by reference it is a no-op
//     console.log(`middle handled`)
//   }

//   render (){
//     console.log('middle rendered ')
//     return <> <div onClick={this.handle.bind(this)}> MIDDLE HERE </div> <Child value={ this.idk } change={this.changeprops}> testing </Child> </>

//     // return <div onClick={this.handle.bind(this)}> <Child value={Date.now()} > testing </Child>> </div>
//   }
// }

// class Child extends React.Component {
//   constructor(props){
//     super(props)
//   }

//   // shouldComponentUpdate(nextprop,nextstate){
//   //   console.log("SHOULDUPDATE")
//   //   if (nextprop.value == this.props.value ) return false
//   //   return true
//   //   // return false
//   // }

//   render(){
//     console.log('child updated' + this.props.value)
//     return (  <div onClick={this.props.change}> CHILD HERE {this.props.value}
//       {/* {Object.values(this.props.value)} */}
//       {/* {this.props.value} */}
//       {/* {this.props.children} */}
//       </div>
//     )
//   }

// }

// export default Middle 




// //https://stackoverflow.com/questions/50053064/react-do-children-always-rerender-when-the-parent-component-rerenders
// import React from "react";

// export default class App extends React.Component {
// // test for passing down an objects prop that is a random obj WORKS
// // test for passing down a number that is also part of App's state WORKS
// // test creating a new key and value in the settimeout WORKS

// // CONCLUSION: 1. Parent needs to re-render or a child's changed props isnt ever sent down
// // 2. "this.props.chidlren of a parent" gets rendered by its parent but absolutely 0 other help in terms of updating props because the parent cant really update its props as a result of updated
// // props being sent down in the parents render like conclusion 1
//   constructor(props){
//     super(props)
//     setTimeout( ()=> {
//       this.proptest.asdf =6
//       // this.setState({asdf : "jkl"})
//       this.forceUpdate()
//     },5000)
//      this.proptest = {asdf:5}
//     this.state = {hi: 'asdf'}
//   }


//   render() {
//     return (
//       <div>
//         {/* 
//           Clicking this component only logs 
//           the parents render function 
//         */}
//         <DynamicParent >
//           <Child uselessprop={this.proptest}/>
//         </DynamicParent>

//         {/* 
//           Clicking this component logs both the 
//           parents and child render functions 
//         */}
//         <StaticParent uselessprop={this.proptest} />
//       </div>
//     );
//   }
// }



// class DynamicParent extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { x: false };
//   }

//   test(){
//     console.log(`actual redraw of dynamicparent`)
//   }

//   render() {
//     // console.log(this.props.children)
//     console.log("render of DynamicParent");
//     return (
//       <div onClick={() => this.setState({ x: !this.state.x })}>
//         {this.props.children}
//         {this.test()}
        
//       </div>
//     );
//   }
// }

// class StaticParent extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { x: false };
//   }

//   test(){
//     console.log(`actual redraw of staticparent ${this.props.uselessprop.asdf}`)
//   }
//     render() {
//     console.log("render of StaticParent");
//     return (
//       <div onClick={() => this.setState({ x: !this.state.x })}>
//         <Child uselessprop = {this.props.uselessprop} />
//         {this.test()}
//       </div>
//     );
//   }
// }

// function Child(props) {
//   console.log(`CHILD HERE, ${props.uselessprop.asdf}`);
//   return <div>Child</div>;
// }






// import React from "react";

// export default class EssayForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 'Please write an essay about your favorite DOM element.'
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('An essay was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Essay:
//           <textarea value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

// export default class FlavorForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: 'coconut' };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }

//   handleSubmit(event) {
//     alert('Your favorite flavor is: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Pick your favorite flavor:
//           <select value={this.state.value} onChange={this.handleChange}>
//             <option value="grapefruit">Grapefruit</option>
//             <option value="lime">Lime</option>
//             <option value="coconut">Coconut</option>
//             <option value="mango">Mango</option>
//           </select>
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

// export default class NameForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: '' };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }

//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

// class Reservation extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isGoing: true,
//       numberOfGuests: 2
//     };

//     this.handleInputChange = this.handleInputChange.bind(this);
//   }

//   handleInputChange(event) {
//     const target = event.target;
//     const value = target.name === 'isGoing' ? target.checked : target.value;
//     const name = target.name;

//     this.setState({
//       [name]: value
//     });
//   }

//   render() {
//     return (
//       <form>
//         <label>
//           Is going:
//           <input
//             name="isGoing"
//             type="checkbox"
//             checked={this.state.isGoing}
//             onChange={this.handleInputChange} />
//         </label>
//         <br />
//         <label>
//           Number of guests:
//           <input
//             name="numberOfGuests"
//             type="number"
//             value={this.state.numberOfGuests}
//             onChange={this.handleInputChange} />
//         </label>
//       </form>
//     );
//   }
// }