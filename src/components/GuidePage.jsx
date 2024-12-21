import { EditorContent, useEditor } from "@tiptap/react";
import { extensions, MenuBar } from "./TipTap";
import { useEffect } from "react";

const GuidePage = ({ content, edit, onContentChange}) => {

  const editor = useEditor({
    extensions: extensions,
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
      <div className="guide-page-edit">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
     )
  }
  else {
      return (
       <div className="guide-page-display">
         <EditorContent editor={editor} />
       </div>
      )
  }

}

export default GuidePage;