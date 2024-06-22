import { useState } from 'react';
import type { ReactNode } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';

import styles from '../assets/css/NavigationDisclosure.module.css';

interface Props {
    label: string,
    children: ReactNode 
}

export default (props: Props) => {
    const { label, children } = props;

    const [ isOpened, setOpened ] = useState(false);

    const className = [
        styles['nav-disclosure'],
        isOpened ? styles['active'] : ''
    ].join(' ');

    const toggleDisclosure = () =>  { setOpened(!isOpened); }

    return (
        <>
            <button
                className={ className }
                aria-expanded={ isOpened }
                onClick={ toggleDisclosure }
            >
                { label }
                { isOpened ? (
                    <FaChevronUp aria-hidden="true" />
                ) : (
                    <FaChevronDown aria-hidden="true" />
                ) }
            </button>
            { isOpened && children }
        </>
    );
};