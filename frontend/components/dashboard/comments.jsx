/* eslint-disable react/react-in-jsx-scope */
import React from "react";

export const Test = styled.div;

// export default class CounterClass extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { count: 1 };
//     }

//     render() {
//         return <div>
//             <p>Count: {this.state.count}</p>
//             <button onClick={() => this.setState({
//                 count: this.state.count + 1
//             })}>Increase</button>
//         </div>;
//     }
// }

// export const OMG =  function CounterFunction() {
//     const [count, setCount] = React.useState(1); // count is this.state.count and setCount is this.setstate({count:})
//     return (
//         <div>
//             <p>Count: {count}</p>
//             <button onClick={() =>
//                 setCount(count + 1)}
//             >Increase</button>
//             {console.log('updated')}
//         </div>
//     );
// }



var Haha = (props) => {
    console.log(props)
    return <Test> CHILD PROP: {Object.values(props.lol)}</Test>
}

Test = function asdf() {
    const [state1, setstate] = React.useState(5)
    // setTimeout(()=>setstate(123),2000)
    let asdf = {asdff:1}
    // setTimeout(() => {
    //     console.log(asdf)
    //     asdf={asdfasf:2}
    //     console.log(asdf)
    //     setstate(11)
    // }
    //     , 2000)

    React.useEffect( ()=> {document.title = `You clicked ${state1} times`});


    return (<div>{state1}<Haha key={state1} lol={ass}> hi {state1} </Haha> </div>)
}


// function FriendStatus(props) {
//   const [isOnline, setIsOnline] = useState(null);

//   useEffect(() => {
//     function handleStatusChange(status) {
//       setIsOnline(status.isOnline);
//     }
//     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
//     // Specify how to clean up after this effect:
//     return function cleanup() {
//       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//     };
//   });

//   if (isOnline === null) {
//     return 'Loading...';
//   }
//   return isOnline ? 'Online' : 'Offline';
// }


// ReactDOM.render(
//     <div>
//         <CounterClass />
//         <CounterFunction />
//     </div>
//     , document.querySelector('#app'));

// class LifecycleClass extends React.Component {
//     componentDidMount() {
//         console.log('Mounted');
//     }

//     componentWillUnmount() {
//         console.log('Will unmount');
//     }

//     render() {
//         return <div>Lifecycle Class</div>;
//     }
// }

// function LifecycleFunction() {
//     React.useEffect(() => {
//         console.log('Mounted');
//         return () => {
//             console.log('Will unmount');
//         };
//     }, []); // Empty array means to only run once on mount.
//     return (
//         <div>Lifecycle Function</div>
//     );
// }

// ReactDOM.render(
//     <div>
//         <LifecycleClass />
//         <LifecycleFunction />
//     </div>
//     , document.querySelector('#app'));