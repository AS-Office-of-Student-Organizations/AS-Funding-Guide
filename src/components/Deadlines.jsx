import React, {useState,useEffect} from "react"

const Deadlines = ({deadlines, edit=false}) => {

    const today = new Date();
    const filteredDeadlines = deadlines
        .filter(deadline => new Date(deadline.dueDate) > today)
        .slice(0,5);
    
    return (
        <div className='deadlines'>
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
                        </tr>
                    </thead>
                    <tbody>
                    {filteredDeadlines.map((deadline, index) => (
                        <tr key={index}>
                            <td><b>{new Date(deadline.periodStart).toLocaleDateString('en-US', {timeZone: 'UTC'})}</b> to <b>{new Date(deadline.periodEnd).toLocaleDateString('en-US', {timeZone: 'UTC'})}</b></td>
                            <td><b>{new Date(deadline.dueDate).toLocaleDateString('en-US', {timeZone: 'UTC'})}</b></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Deadlines;