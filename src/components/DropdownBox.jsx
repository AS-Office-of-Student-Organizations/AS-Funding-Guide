import React, { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PropTypes from "prop-types";
import "../styles/global.css"; // Include styling for animation and layout

const DropdownBox = ({ header, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  

  const editor = useEditor({
    extensions: [StarterKit],
    editable: false, // Ensure the text is not editable
    content: text
  });


  return (
    <div className="dropdown-box">
      <div
        className="dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        {header}
      </div>
      <div className={`tiptap, dropdown-content ${isOpen ? "open" : "closed"}`}>
        {editor && <EditorContent editor={editor} />}
      </div>
    </div>
  );
};

DropdownBox.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default DropdownBox;