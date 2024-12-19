import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

function BigInfoEditor() {
    const [data, setData] = useState([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchBigInfo = async () => {
            try {
                const docRef = doc(db, "bigInfo", "r4XYAOkvPfQY9NdNJDqz"); // hard code for now
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data().boxes);
                } else {
                    console.error("no such document!");
                }
            } catch (error) {
                console.error("Error fetching biginfo:", error);
            }
        };

        fetchBigInfo();
    }, []);

    const handleSave = async () => {
        try {
            const docRef = doc(db, "bigInfo", "r4XYAOkvPfQY9NdNJDqz");
            await updateDoc(docRef, { boxes: data });
            alert("Data saved successfully!");
        } catch (error) {
            console.error("Error saving biginfo:", error);
        }
    };

    const handleAddBox = () => {
        setData([...data, { content: "", description: "" }]);
    };

    const handleDeleteBox = (index) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    const moveBox = (dragIndex, hoverIndex) => {
        const dragBox = data[dragIndex];
        const newData = [...data];
        newData.splice(dragIndex, 1);
        newData.splice(hoverIndex, 0, dragBox);
        setData(newData);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="big-info-editor">
                {data.map((item, index) => (
                    <Box
                        key={index}
                        index={index}
                        item={item}
                        moveBox={moveBox}
                        handleDeleteBox={handleDeleteBox}
                        setData={setData}
                        data={data}
                    />
                ))}
                <button onClick={handleAddBox}>Add New Box</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </DndProvider>
    );
}

function Box({ item, index, moveBox, handleDeleteBox, setData, data }) {
    const [, ref] = useDrag({
        type: 'box',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'box',
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveBox(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    const editor = useEditor({
        extensions: [StarterKit],
        editable: true, 
        content: data[index].description
      });
    

    const handleContentChange = (e) => {
        const newData = [...data];
        newData[index].content = e.target.value;
        setData(newData);
    };

    editor.on('update', ({ editor }) => {
        const newData = [...data];
        newData[index].description = editor.getHTML();
        setData(newData);
      })

    
    

    return (
        <div ref={(node) => ref(drop(node))} className="box">
            <textarea
                value={item.content}
                onChange={handleContentChange}
                placeholder="Content"
            />
            {editor && <EditorContent editor={editor} />}
            <button onClick={() => handleDeleteBox(index)}>Delete</button>
        </div>
    );
}

export default BigInfoEditor;