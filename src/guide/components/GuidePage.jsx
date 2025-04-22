import { EditorContent, useEditor } from '@tiptap/react';
import { extensions, MenuBar, ToC } from '@/components/TipTap';
import React, { useEffect, useRef, useState } from 'react';
import { getHierarchicalIndexes, TableOfContents } from '@tiptap-pro/extension-table-of-contents';
import PropTypes from 'prop-types';

const MemorizedToC = React.memo(ToC);

const GuidePage = ({ content, edit, onContentChange }) => {
  const [items, setItems] = useState([]);
  const isMounted = useRef(true); // Track mounted status

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false; // Clean up on unmount
    };
  }, []);

  // Safe handler for updating ToC items
  const handleToCUpdate = tocItems => {
    if (isMounted.current) {
      setItems(tocItems);
    }
  };

  const editor = useEditor({
    extensions: [
      ...extensions,
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate: handleToCUpdate,
      }),
    ],
    content,
    editable: edit,
  });

  // Safely update editor content if external content changes
  useEffect(() => {
    if (!editor || !isMounted.current) return;

    const currentHTML = editor.getHTML();
    if (content !== currentHTML) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  // Watch for editor content changes and propagate to parent
  useEffect(() => {
    if (!editor || !onContentChange) return;

    const handler = () => {
      if (isMounted.current) {
        const newContent = editor.getHTML();
        onContentChange(newContent);
      }
    };

    editor.on('update', handler);
    return () => {
      editor.off('update', handler);
    };
  }, [editor, onContentChange]);

  return (
    <div className="guide-page">
      <div className={edit ? 'guide-page-edit' : 'guide-page-display'}>
        {edit && <MenuBar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
      <div className="guide-right-column">
        <div className="table-of-contents">
          <MemorizedToC editor={editor} items={items} />
        </div>
      </div>
    </div>
  );
};

GuidePage.propTypes = {
  content: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  onContentChange: PropTypes.func,
};

export default GuidePage;
