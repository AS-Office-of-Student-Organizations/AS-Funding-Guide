import React from "react";
import {Link} from 'react-router-dom';

const NavBar=()=>{
    return(
        <div className="navBar">
            <span className="fundingGuide">
                <Link to='/'>Funding Guide</Link>
            </span>
            <span className="admin">
                <Link to='/Admin'>Admin Page</Link>
            </span>
        </div>
    );
}

export default NavBar;