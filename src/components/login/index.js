import React, { Component } from 'react';
import LoginForm from './loginForm';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            userDetail:'',
            user:{
                email:''
            },
            loggedIn:false
        };
        this.loginAction =  this.loginAction.bind(this);
        this.changeUser =  this.changeUser.bind(this);
    }
    componentWillMount() {
        let getUserDetail = localStorage.getItem('userDetail');
        return (getUserDetail ? this.setState({userDetail:JSON.parse(getUserDetail), loggedIn:true}) : null);
    }
    loginAction(e){
        e.preventDefault();
        localStorage.setItem('userDetail', JSON.stringify(this.state.user));
        this.setState({
            loggedIn:true
        })
        this.forceUpdate()
    }
    changeUser(event) {
        const field = event.target.id;
        let user = this.state.user;
        user[field] = event.target.value;
        this.setState({
          user
        });
      }
    render() {
        const loggedIn = this.state.loggedIn;
        return (
            <section className="container">
                {loggedIn ?(
                  <Redirect to="/movie" />
                ): <LoginForm user={this.state.user} onSubmit={this.loginAction} onChange={this.changeUser}/>}
            </section>
        )
    }
}

export default Login;
