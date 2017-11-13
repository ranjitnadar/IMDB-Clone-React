import React from 'react';

const Header = (props) =>{
	return (

		<section>
			
			 <section>
				<nav className="navbar navbar-default">
					<div className="container">
						<div className="navbar-header">
							<a className="navbar-brand" href="/list">Logo</a>
						</div>
						<div id="navbar" className="navbar-collapse collapse">
							
							<ul className="nav navbar-nav navbar-right">
								<li><span className="loggedInUser">{props.user.email}</span></li>
								<li><a onClick={props.isLogout}>Logout</a></li>
							</ul>
						</div>
					</div>
				</nav> 
			</section>
		</section>
	);
}
export default Header;
