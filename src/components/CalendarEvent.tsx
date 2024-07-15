import { useState } from 'react';
import type { CalendarQueryResult } from '@studio/sanity-typegen';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';
import styles from '@styles/components/CalendarEvent.module.css';

interface Props {
    event: CalendarQueryResult[number]
}

export const CalendarEvent = (props : Props) => {
    const { event } = props;

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

    const emptyEvent =
        !event.location &&
        !event.description &&
        !event.accessibility &&
        !event.links?.length;

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
            { isOpened && (
                <div className={ styles['event-details'] }>
                    { event.location && (
                        <div className={ styles['event-detail'] }>
                            <h3>Location</h3>
                            <p>{ event.location }</p>
                        </div>
                    ) }
                    { event.description && (
                        <div className={ styles['event-detail'] }>
                            <h3>Description</h3>
                            <p>{ event.description }</p>
                        </div>
                    ) }
                    { event.accessibility && (
                        <div className={ styles['event-detail'] }>
                            <h3>Accessibility</h3>
                            <p>{ event.accessibility }</p>
                        </div>
                    ) }
                    { event.links?.length && (
                        <div className={ styles['event-detail'] }>
                            <h3>Links</h3>
                            <ul>
                                { event.links.map(link => (
                                    <li key={ link._key }>
                                        <a
                                            href={ link.url }
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            { link.label }
                                        </a>
                                    </li>
                                )) }
                            </ul>
                        </div>
                    ) }
                    { emptyEvent && (
                        <div className={ styles['event-detail'] }>
                            <p><i>No details available.</i></p>
                        </div>
                    ) }
                </div>
            ) }
        </div>
    );
};