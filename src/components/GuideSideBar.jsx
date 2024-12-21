import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

const GuideSideBar = ({pages}) => {

    return (
      <div className= "guide-sidebar">
        <ul>
          <li className= 'guide-sidebar-header'>
            PAGES
          </li>
          {pages.map((page, index) => (
            <li key={index} className= {page.header ? 'guide-sidebar-header' : '' }>
              {page.header ? (
                page.pageName
              ) :
              (
              <NavLink to={`/guide/${page.pageName.toLowerCase().replace(/\s+/g, "-")}`}>
                {page.pageName}
              </NavLink>)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default GuideSideBar;
