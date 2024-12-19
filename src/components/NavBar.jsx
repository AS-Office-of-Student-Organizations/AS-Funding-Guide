import React from "react";
import {Link} from 'react-router-dom';

const NavBar=()=>{
    return(
        <div className="nav-bar">
            <span className="site-title">
                Office of Student Organizations Resource Page
            </span>
            <div className="nav-list">
                <span className="link">
                    <Link to='/'>User-Friendly Funding Guide</Link>
                </span>
                <span className="link">
                    <Link to='/Admin'>Admin</Link>
                </span>
                <span className="link">
                    <a href="https://finance.ucsd.edu/">Official A.S Funding Website</a>
                </span>
            </div>
        </div>
    );
}

export default NavBar;