import { EditorContent, useEditor } from "@tiptap/react";
import { extensions, MenuBar, ToC } from "./TipTap";
import React, { useEffect, useState} from "react";
import { getHierarchicalIndexes, TableOfContents } from '@tiptap-pro/extension-table-of-contents';

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

  if(edit) {
     return (
      <div className="guide-page">
        <div className="guide-page-edit">
          <MenuBar editor={editor} />
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
  else {
      return (
        <div className="guide-page">
          <div className="guide-page-display">
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

}

export default GuidePage;