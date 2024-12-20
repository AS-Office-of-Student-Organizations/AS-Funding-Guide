import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

const GuideSideBar = ({pages}) => {

    return (
      <div className= "guide-sidebar">
        <h2>Pages</h2>
        <ul>
          {pages.map((page, index) => (
            <li key={index}>
              <NavLink to={`/guide/${page.pageName.toLowerCase().replace(/\s+/g, "-")}`}>
                {page.pageName}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default GuideSideBar;