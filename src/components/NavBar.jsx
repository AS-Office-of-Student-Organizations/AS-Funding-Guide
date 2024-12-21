import React from "react";
import {NavLink} from 'react-router-dom';

const NavBar=()=>{
    return(
        <div className="nav-bar">
            <h1 className="site-title">
                    Office of Student Orgs
            </h1>

            <div className="nav-list">
                <span className="link">
                    <NavLink to='/'>User-Friendly Funding Guide</NavLink>
                </span>
                <span className="link">
                    <NavLink to="/guide">Guide</NavLink>
                </span>
                <span className="link">
                    <NavLink to='/admin'>Admin</NavLink>
                </span>
                <span className="link">
                    <a href="https://finance.ucsd.edu/">Official A.S Funding Website</a>
                </span>
            </div>
        </div>
    );
}

export default NavBar;