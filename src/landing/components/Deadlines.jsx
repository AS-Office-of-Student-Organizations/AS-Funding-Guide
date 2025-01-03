import { Calendar } from "lucide-react";
import PropTypes from "prop-types";

const Deadlines = ({deadlines}) => {

    const today = new Date();
    const filteredDeadlines = deadlines
        .filter(deadline => new Date(deadline.dueDate) > today)
        .slice(0,5);
    
    return (
        <div className='deadlines'>
            <div className='section-header'>
                <Calendar/>
                <h2>Upcoming Funding Deadlines</h2>
            </div>
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

Deadlines.propTypes = {
    deadlines: PropTypes.arrayOf(
        PropTypes.shape({
        periodStart: PropTypes.string.isRequired,   
        periodEnd: PropTypes.string.isRequired, 
        dueDate: PropTypes.string.isRequired,
        })
    ).isRequired,
}