import React, { useState, useEffect} from "react";
import {NavLink, useLocation} from 'react-router-dom';
import DropDownButton from "./DropDownButton";

const NavBar=()=>{
    const [activeLinkName, setActiveLinkName] = useState('');
    const location = useLocation();

    const links = [
        { to: '/guide', name: 'Guide' },
        { to: '/admin', name: 'Admin' },
    ];

    useEffect(() => {
        const activeLink = links.find(link => location.pathname.includes(link.to));
        if (activeLink) {
            setActiveLinkName(activeLink.name);
        } else {
             setActiveLinkName(''); // Optionally clear if no link matches
        }
    }, [location, links]);

    
    const navLinks = [<NavLink to="/guide">Guide</NavLink>, <NavLink to='/admin'>Admin</NavLink>, <a href="https://finance.ucsd.edu/" target="_blank">Funding Portal 🗗</a>]

    return(
        <div className="nav-bar">
            <NavLink to="/" className="title-link">
                <header>
                    <img className="title-logo" alt="Associated Students Logo" src="/public/logo_simplified.png"></img>
                    <div className="title-text">
                        <h1 className="title">
                                Associated Students
                        </h1>
                        <p className="subtitle">Office of Student Organizations</p>
                    </div>
                </header>
            </NavLink>
            <DropDownButton label={activeLinkName + '🡻'} data={navLinks}/>
            <div className="nav-list">
                <span className="link">
                    <NavLink to="/guide">Guide</NavLink>
                </span>
                <span className="link">
                    <NavLink to='/admin'>Admin</NavLink>
                </span>
                <span className="link">
                    <a href="https://finance.ucsd.edu/" target="_blank">Funding Portal 🗗</a>
                </span>
            </div>
        </div>
    );
}

export default NavBar;