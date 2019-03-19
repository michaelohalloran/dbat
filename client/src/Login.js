import React, { Component } from "react";
import "./Login.css";

export default class Login extends Component {
	state = {
		username: "",
		password: ""
	};

	onSubmit = (e) => {
		e.preventDefault();
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		//determine which links to show by checking auth state
		// const authLinks = ;
		// const guestLinks = ;
		// const links = (this.state.isLoggedIn) ? {} : {} ;

		//add router functionality to li's

		return (
			<div>
				<ul className="auth-links">
					<li>Sign up</li>
					<li>Login</li>
				</ul>

				<form className="login-form" onSubmit={this.onSubmit}>
					<label>Username: </label>
					<input type="text" name="username" onChange={this.onChange} value={this.state.username} />
					<label>Password: </label>
					<input type="password" name="password" onChange={this.onChange} value={this.state.password} />

					<button className="login-btn">Sign up</button>
				</form>
			</div>
		);
	}
}
