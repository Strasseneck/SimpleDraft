import { FC, useEffect } from 'react';
import './SingleChangePage.css';

interface Props {
    sanitizedHtmlDiffs: string;
}

const SingleChangePage: FC<Props> = ({ sanitizedHtmlDiffs }) => {
    useEffect(() => {
        const contentElement = document.querySelector('.SingleChangePage') as HTMLElement;
        if (contentElement) {
            contentElement.style.height = "auto";
            contentElement.style.height = `${contentElement.scrollHeight}px`;
        }
    }, []);

    return (
        <div
            className='SingleChangePage'
            dangerouslySetInnerHTML={{ __html: sanitizedHtmlDiffs }}
        />
    );
};

export default SingleChangePage;
