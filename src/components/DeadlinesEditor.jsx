import React, {useState, useEffect} from "react";
import DeadlineDatePicker from "./DeadlineDatePicker";
import { getDoc, doc, updateDoc} from "firebase/firestore";
import { Draggable, DragDropContext, Droppable} from "react-beautiful-dnd";
import { db } from "../firebase";
import { parseDate, today } from "@internationalized/date";
import { v4 as uuidv4} from 'uuid';

const DeadlinesEditor = () => {
    const [deadlines, setDeadlines] = useState([])
          
    useEffect(() => {
        const fetchDeadlines = async () => {
        try {
            const docRef = doc(db, "public", "landing"); // hard code for now
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const fetchedDeadlines = docSnap.data().deadlines;
                const parsedDeadlines = fetchedDeadlines.map((deadline) => ({
                    periodStart: parseDate(deadline.periodStart),
                    periodEnd: parseDate(deadline.periodEnd),
                    dueDate: parseDate(deadline.dueDate),
                    id: uuidv4(),
                }));
                setDeadlines(parsedDeadlines)
            } else {
                console.error("no such document!");
            }
        } catch (error) {
            console.error("Error fetching pages:", error);
        }
        };
        fetchDeadlines();
    
        
    }, []);

    const handleAddDeadline = () => {
        setDeadlines([...deadlines, 
            {periodStart: today(), periodEnd: today(), dueDate: today(), id: uuidv4}]);
    }

    const handleDateChange = (index, field, value) => {
        setDeadlines((prevDeadlines) =>
          prevDeadlines.map((deadline, i) =>
            i === index ? { ...deadline, [field]: value } : deadline
          )
        );
    };

    const handleDeleteDeadline = (index) => {
        console.log(index);
        const newDeadlines = deadlines.filter((_, i) => i !== index);
        setDeadlines(newDeadlines);
    }

    const handleSave = async () => {
        const formattedDates = deadlines.map((date) => ({
          periodStart: date.periodStart.toString(),
          periodEnd: date.periodEnd.toString(),
          dueDate: date.dueDate.toString(),
        }));
        try {
            const docRef = doc(db, "public", "landing");
            await updateDoc(docRef, { deadlines: formattedDates });
            alert("Deadlines saved successfully!");
        } catch (error) {
            console.error("Error saving deadlines:", error);
        }
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
    
        // If dropped outside the list or in the same position, do nothing
        if (!destination || source.index === destination.index) return;
    
        // Reorder the pages array
        const reorderedDeadlines = Array.from(deadlines);
        const [removed] = reorderedDeadlines.splice(source.index, 1);
        reorderedDeadlines.splice(destination.index, 0, removed);
    
        // Update the pages state
        setDeadlines(reorderedDeadlines);
    };

    return (
        <div className='deadlines-editor'>
            <h2>Upcoming Funding Deadlines</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th scope='col'>
                                Event Date
                            </th>
                            <th scope='col'>
                                Due Date
                            </th>
                            <th scope='col'>Test</th>
                        </tr>
                    </thead>
                    <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="announcements">
                    {(provided) => (
                        <tbody
                        ref={provided.innerRef} 
                        {...provided.droppableProps}>
                            {deadlines.map((deadline, index) => (
                                <Draggable key={deadline.id} draggableId={deadline.id} index={index}>
                                {(provided) => (
                                <tr key={index}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}>
                                    <td>
                                        <div>
                                        <DeadlineDatePicker 
                                            value={deadline.periodStart}
                                            onChange={(value) => handleDateChange(index, 'periodStart', value)}
                                        /> to 
                                        <DeadlineDatePicker 
                                            value={deadline.periodEnd}
                                            onChange={(value) => handleDateChange(index, 'periodEnd', value)}
                                        />
                                        </div>
                                    </td>
                                    <td>
                                        <DeadlineDatePicker 
                                            value={deadline.dueDate}
                                            onChange={(value) => handleDateChange(index, 'dueDate', value)}
                                        />
                                    </td>
                                    <td>
                                        <button className='deadline-button' onClick={() => handleDeleteDeadline(index)}>Delete</button>
                                    </td>
                                </tr>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </tbody>
                        )}
                    </Droppable>
                </DragDropContext>
                </table>
                <div className='edit-buttons'>
                    <button className='edit-button' onClick={handleAddDeadline}>
                        Add
                    </button>
                    <button className='edit-button'onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeadlinesEditor;