import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import { Menu, ChevronLeft } from 'lucide-react';
import PropTypes from 'prop-types';

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
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={`guide-left-column scroll-when-hover ${isSidebarVisible ? '' : 'hidden'}`}>
      <div
        className={`guide-sidebar `}
        ref={editMode ? provided.innerRef : null}
        {...(editMode ? provided.droppableProps : {})}
      >
        <ul>
          {pages.map((page, index) =>
            editMode ? (
              <Draggable key={page.pageName} draggableId={page.pageName} index={index}>
                {provided => (
                  <li
                    ref={provided.innerRef}
                    // eslint-disable-next-line react/prop-types
                    {...provided.draggableProps}
                    // eslint-disable-next-line react/prop-types
                    {...provided.dragHandleProps}
                    className={page.header ? 'guide-sidebar-header' : ''}
                  >
                    {page.header ? (
                      page.pageName
                    ) : (
                      <NavLink
                        to={`/admin/guide/${page.pageName.toLowerCase().replace(/\s+/g, '-')}`}
                      >
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
              <li
                key={index}
                onClick={() => toggleSidebar()}
                className={page.header ? 'guide-sidebar-header' : ''}
              >
                {page.header ? (
                  page.pageName
                ) : (
                  <NavLink to={`/guide/${page.pageName.toLowerCase().replace(/\s+/g, '-')}`}>
                    {page.pageName}
                  </NavLink>
                )}
              </li>
            )
          )}
          {
            // eslint-disable-next-line react/prop-types
            editMode && provided.placeholder
          }
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
      <button
        className={`sidebar-toggle ${isSidebarVisible ? 'extended' : 'contracted'}`}
        onClick={toggleSidebar}
      >
        {isSidebarVisible ? <ChevronLeft /> : <Menu />}
      </button>
    </div>
  );
};

export default GuideSideBar;

GuideSideBar.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      pageName: PropTypes.string.isRequired,
      pageContent: PropTypes.string.isRequired,
    })
  ).isRequired,
  editMode: PropTypes.bool,
  handleAddPage: PropTypes.func,
  handleAddHeader: PropTypes.func,
  handleDeletePage: PropTypes.func,
  handleEditPageName: PropTypes.func,
  handleSave: PropTypes.func,
  provided: PropTypes.shape({
    innerRef: PropTypes.func,
    droppableProps: PropTypes.object,
  }),
};
