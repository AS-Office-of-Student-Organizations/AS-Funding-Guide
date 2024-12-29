import {Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Label, Popover} from 'react-aria-components';
import { parseDate } from '@internationalized/date';

const DeadlineDatePicker = ({value, onChange}) => {
    
    return (
        <DatePicker defaultValue={value} onChange={onChange} aria-labelledby='Date'>
        <Group>
            <DateInput>
            {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <Button>▼</Button>
        </Group>
        <Popover>
            <Dialog>
            <Calendar>
                <header>
                <Button slot="previous">◀</Button>
                <Heading />
                <Button slot="next">▶</Button>
                </header>
                <CalendarGrid>
                {(date) => <CalendarCell date={date} />}
                </CalendarGrid>
            </Calendar>
            </Dialog>
        </Popover>
        </DatePicker>
    )
}

export default DeadlineDatePicker