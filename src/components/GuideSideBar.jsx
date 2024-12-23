import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

const GuideSideBar = ({
  pages, 
  editMode = false,
  handleAddPage,
  handleAddHeader,
  handleDeletePage,
  handleEditPageName,
  handleSave,
  provided,
}) => {
  return (
    <div
      className="guide-sidebar"
      ref={editMode ?  provided.innerRef : null} {...(editMode ? provided.droppableProps : {})}
    >
      <ul>
        {pages.map((page, index) => 
          editMode ? (
            <Draggable key={page.pageName} draggableId={page.pageName} index={index}>
              {(provided) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={page.header ? "guide-sidebar-header" : ""}
                >
                  {page.header ? (
                    page.pageName
                  ) : (
                    <NavLink to={`/admin/guide/${page.pageName.toLowerCase().replace(/\s+/g, "-")}`}>
                      {page.pageName}
                    </NavLink>
                  )}
                  <div>
                    <button className="page-button" onClick={() => handleEditPageName(index)}>
                      🖋️
                    </button>
                    <button className="page-button" onClick={() => handleDeletePage(index)}>
                      🗑️
                    </button>
                  </div>
                </li>
          )}
        </Draggable>
      ) : (
        <li key={index} className={page.header ? "guide-sidebar-header" : ""}>
          {page.header ? (
            page.pageName
          ) : (
            <NavLink to={`/guide/${page.pageName.toLowerCase().replace(/\s+/g, "-")}`}>
              {page.pageName}
            </NavLink>
          )}
        </li>
      )
    )}
    {editMode && provided.placeholder}
    </ul>
      {editMode && (
        <div className="sidebar-buttons">
          <button className="create-page" onClick={handleAddPage}>
            + Page
          </button>
          <button className="create-header" onClick={handleAddHeader}>
            + Header
          </button>
          <button className="save-page" onClick={handleSave}>
            Save
          </button>
        </div> 
        )}
    </div>
  );
  
  };

export default GuideSideBar;
