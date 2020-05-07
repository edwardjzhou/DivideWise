# README

## Brief explanation of the App

Dividewise is my Splitwise clone! Add friends and then add bills relating to those friends and make payments on those bills. Dividewise is here to ease the awkwardness in group payments. After viewing the splash page please sign-in or login as a demo-user. Then you can add friends (forcefully) and add bills (TBD)!

## Link to live site

[Dividewise!](http://dividewise.herokuapp.com/)

## Discussion of technologies used

1. React for the frontend
2. Redux as the store
3. PostgreSQL for the database
4. Ruby on rails for handling the API backend and MVC

## 2 Notable Features

1. I was using Postman to try to hit my database and I managed to make a user make two other users who weren't him/her friends. So I put in a controller validation for that with current_user, to think ahead about potential abuse of my API backend.

2. I made text change every few seconds (along with its color and an accompanying image) in my splash page .jsx component, like it does on the real Splitwise with the help of w3schools fade script and my use of react's local state depending on seconds passed with a setInterval after the component mounts.

```
if (this.state.seconds % 3 === 0) {
    answer = "with anyone."
    url = window.plane
    classname="filter-blue"
} else if (this.state.seconds % 3 === 1) {
    answer = "with housemates."
    url = window.house
    classname="filter-green"
} else {
    answer = "with your partner."
    url= window.heart
    classname="filter-red"
}

this.setState(state => ({
    answer: answer,
    url:url,
    classname:classname
}))
```
