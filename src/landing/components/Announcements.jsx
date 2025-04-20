import { useEffect } from 'react';
import { extensions, SimpleMenuBar } from '@/components/TipTap';
import { useEditor, EditorContent } from '@tiptap/react';
import { Draggable } from 'react-beautiful-dnd';
import { Bell } from 'lucide-react';
import PropTypes from 'prop-types';

const AnnouncementContent = ({ content, edit, onContentChange }) => {
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
    <div className="announcement-content">
      {edit ? <SimpleMenuBar editor={editor} /> : <></>}
      <EditorContent editor={editor} />
    </div>
  );
};

const Announcements = ({
  announcements,
  editMode = false,
  handleDeleteAnnouncement,
  handleContentChange,
  handleEditTitle,
  provided,
}) => {
  return (
    <div className="announcements">
      <div className="section-header">
        <Bell />
        <h2>Announcements</h2>
      </div>
      <div ref={editMode ? provided.innerRef : null} {...(editMode ? provided.droppableProps : {})}>
        {announcements.map((announcement, index) =>
          editMode ? (
            <Draggable key={announcement.title} draggableId={announcement.title} index={index}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  // eslint-disable-next-line react/prop-types
                  {...provided.draggableProps}
                  // eslint-disable-next-line react/prop-types
                  {...provided.dragHandleProps}
                  className="announcement"
                >
                  <div className="title-editor">
                    <h3>{announcement.title}</h3>
                    <div className="anouncement-buttons">
                      <button
                        className="announcement-button"
                        onClick={() => handleEditTitle(index)}
                      >
                        🖋️
                      </button>
                      <button
                        className="announcement-button"
                        onClick={() => handleDeleteAnnouncement(index)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  {
                    <AnnouncementContent
                      content={announcement.content}
                      edit={editMode}
                      onContentChange={newContent => handleContentChange(index, newContent)}
                    />
                  }
                </div>
              )}
            </Draggable>
          ) : (
            <div key={index} className="announcement">
              <h3>{announcement.title}</h3>
              {<AnnouncementContent content={announcement.content} edit={editMode} />}
            </div>
          )
        )}
        {
          // eslint-disable-next-line react/prop-types
          editMode && provided.placeholder
        }
      </div>
    </div>
  );
};

export default Announcements;

AnnouncementContent.propTypes = {
  content: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  onContentChange: PropTypes.func,
};

Announcements.propTypes = {
  announcements: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  editMode: PropTypes.bool,
  handleDeleteAnnouncement: PropTypes.func,
  handleContentChange: PropTypes.func,
  handleEditTitle: PropTypes.func,
  provided: PropTypes.shape({
    innerRef: PropTypes.func,
    droppableProps: PropTypes.object,
  }),
};
