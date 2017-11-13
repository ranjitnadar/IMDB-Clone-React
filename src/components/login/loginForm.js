import React from 'react';

const LoginForm = (props) => {
    
    return (
        <section className="loginForm fullscreen_bg"  id="fullscreen_bg" >
            
            <div className="container form-signin">
                <h1 className="text-center form-signin-heading">Login</h1>
                <form onSubmit={props.onSubmit} className="">
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" value={props.user.email} onChange={props.onChange} placeholder="Enter Email Address"/>
                    </div>
                    <button type="submit" className="btn btn-success btn-block">Submit</button>
                </form>
            </div>
        </section>
    )
}

export default LoginForm;