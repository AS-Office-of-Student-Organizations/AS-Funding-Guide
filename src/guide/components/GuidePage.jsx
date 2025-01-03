import { EditorContent, useEditor } from "@tiptap/react";
import { extensions, MenuBar, ToC } from "../../components/TipTap";
import React, { useEffect, useState} from "react";
import { getHierarchicalIndexes, TableOfContents } from '@tiptap-pro/extension-table-of-contents';
import PropTypes from 'prop-types';

const MemorizedToC = React.memo(ToC)

const GuidePage = ({ content, edit, onContentChange}) => {
  
  const [items, setItems] = useState([])

  const editor = useEditor({
    extensions: [...extensions, 
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(content) {
          setItems(content)
        },
      }),],
    content: content,
    editable: edit,
  });

  useEffect(() => {
    if (editor) {
      if (content != editor.getHTML()) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

  useEffect(() => {
    if (editor && onContentChange) {
        const updateHandler = () => {
            const newContent = editor.getHTML();
            onContentChange(newContent);
        };
        editor.on('update', updateHandler);
        return () => {
            editor.off('update', updateHandler);
        };
    }
  }, [editor, onContentChange]);

  return (
  <div className="guide-page">
    <div className={edit ? "guide-page-edit" : "guide-page-display"}>
      {edit ? <MenuBar editor={editor}/> : <></>}
      <EditorContent editor={editor} />
    </div>
    <div className="guide-right-column">
      <div className="table-of-contents">
          <MemorizedToC editor={editor} items={items} />
      </div>
    </div>
  </div>
  )

}

export default GuidePage;

GuidePage.propTypes = {
  content: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  onContentChange: PropTypes.func,
}