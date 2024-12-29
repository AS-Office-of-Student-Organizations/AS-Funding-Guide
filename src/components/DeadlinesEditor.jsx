import React, {useState, useEffect} from "react";
import DeadlineDatePicker from "./DeadlineDatePicker";
import { getDoc, doc, updateDoc} from "firebase/firestore";
import { DragDropContext, Droppable} from "react-beautiful-dnd";
import { db } from "../firebase";
import { parseDate, today } from "@internationalized/date";

const DeadlinesEditor = () => {
    const [deadlines, setDeadlines] = useState([])
          
    useEffect(() => {
        const fetchDeadlines = async () => {
        try {
            const docRef = doc(db, "landingContent", "userFeed"); // hard code for now
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const fetchedDeadlines = docSnap.data().deadlines;
                const parsedDeadlines = fetchedDeadlines.map((deadline) => ({
                    periodStart: parseDate(deadline.periodStart),
                    periodEnd: parseDate(deadline.periodEnd),
                    dueDate: parseDate(deadline.dueDate),
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
            {periodStart: today(), periodEnd: today(), dueDate: today()}]);
    }

    const handleDateChange = (index, field, value) => {
        setDeadlines((prevDeadlines) =>
          prevDeadlines.map((deadline, i) =>
            i === index ? { ...deadline, [field]: value } : deadline
          )
        );
    };

    const handleDeleteDeadline = (index) => {
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
            const docRef = doc(db, "landingContent", "userFeed");
            await updateDoc(docRef, { deadlines: formattedDates });
            alert("Deadlines saved successfully!");
        } catch (error) {
            console.error("Error saving deadlines:", error);
        }
    };

    console.log(deadlines);
    

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
                    <tbody>
                    {deadlines.map((deadline, index) => (
                        <tr key={index}>
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
                                <button onClick={() => handleDeleteDeadline(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
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