import React, {useState,useEffect} from "react"
import { extensions, SimpleMenuBar } from './TipTap';
import { useEditor, EditorContent } from "@tiptap/react";
import { Draggable } from "react-beautiful-dnd";
import {Bell} from "lucide-react";


const AnnouncementContent = ({content, edit, onContentChange}) => {

    const editor = useEditor({
        extensions: [...extensions],
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
        <div className='announcement-content'>
            {edit ? <SimpleMenuBar editor={editor}/> : <></>}
            <EditorContent editor={editor} />
        </div>
    )
}

const Announcements = ({
        announcements, 
        editMode=false,
        handleDeleteAnnouncement,
        handleContentChange,
        handleEditTitle,
        provided,
        }) => {
    return (
        <div className='announcements'>
            <div className='section-header'>
                <Bell/>
                <h2>Announcements</h2>
            </div>
            <div ref={editMode ?  provided.innerRef : null} {...(editMode ? provided.droppableProps : {})}>
                {
                    announcements.map((announcement, index) => (
                        editMode ? (
                            <Draggable key={announcement.title} draggableId={announcement.title} index={index}>
                                    {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className='announcement'
                                    >
                                        <div className='title-editor'>
                                            <h3>{announcement.title}</h3>
                                            <div className="anouncement-buttons">
                                                <button className="announcement-button" onClick={() => handleEditTitle(index)}>
                                                    🖋️
                                                </button>
                                                <button className="announcement-button" onClick={() => handleDeleteAnnouncement(index)}>
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                        {<AnnouncementContent content={announcement.content} edit={editMode}
                                            onContentChange={(newContent) =>
                                                handleContentChange(index, newContent)
                                            }
                                          />}
                                    </div>
                                )}
                            </Draggable>)
                            : (<div key={index} className='announcement'>
                            <h3>{announcement.title}</h3>
                            {<AnnouncementContent content={announcement.content} edit={editMode}/>}
                            </div>)
                        )
                )}
                {editMode && provided.placeholder}
            </div>
        </div>
    )
}

export default Announcements;