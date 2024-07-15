import { useState, type PropsWithChildren } from 'react';
import type { CalendarQueryResult } from '@studio/sanity-typegen';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';
import styles from '@styles/components/CalendarEvent.module.css';

interface Props extends PropsWithChildren {
    event: CalendarQueryResult[number]
}

export const CalendarEvent = (props : Props) => {
    const { event, children } = props;

    const [ isOpened, setOpened ] = useState(false);

    const toggleDisclosure = () =>  { setOpened(!isOpened); }

    const startDate = new Date(event.date.startDate);
    const endDate = new Date(event.date.endDate!);

    const [ startDay, endDay ] = [ startDate, endDate ].map(date => {
        return structuredClone(date).setHours(0, 0, 0, 0);
    });
    const daySpan = Math.ceil((endDay - startDay) / (1000 * 60**2 * 24));

    const timeLabel = [ startDate, endDate ].map(date => {
        return date
            .toLocaleTimeString('en-US', { timeStyle: 'short' })
            .toLowerCase();
    }).join(' — ');

    return (
        <div className={ styles['event-container'] }>
            <button
                className={ styles['event-disclosure'] }
                aria-expanded={ isOpened }
                onClick={ toggleDisclosure }
            >
                <div>
                    <div className={ styles['event-name'] }>
                        { event.name }
                    </div>
                    <div className={ styles['event-time'] }>
                        { timeLabel }
                        { daySpan > 0 && (
                            <sup> +{ daySpan }</sup>
                        ) }
                    </div>
                </div>
                <div>
                    { isOpened ? (
                        <FaChevronUp aria-hidden="true" />
                    ) : (
                        <FaChevronDown aria-hidden="true" />
                    ) }
                </div>
            </button>
            { isOpened && children }
        </div>
    );
};