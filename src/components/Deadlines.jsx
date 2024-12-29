import React, {useState,useEffect} from "react"

const Deadlines = ({deadlines}) => {

    const today = new Date();
    const filteredDeadlines = deadlines
        .filter(deadline => new Date(deadline.dueDate) > today)
        .slice(0,3);

    console.log("help1" + filteredDeadlines);
    console.log("help2" + deadlines);
    console.log(deadlines);
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
                            <td><b>{new Date(deadline.periodStart).toLocaleDateString()}</b> to <b>{new Date(deadline.periodEnd).toLocaleDateString()}</b></td>
                            <td><b>{new Date(deadline.dueDate).toLocaleDateString()}</b></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Deadlines;