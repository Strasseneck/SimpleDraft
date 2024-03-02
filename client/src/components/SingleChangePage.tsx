import { FC } from 'react';
import './SingleChangePage.css'

interface Props {
    sanitizedHtmlDiffs: string;
}

const SingleChangePage: FC<Props> = ({ sanitizedHtmlDiffs }) => {
    
    const calculateHeight = () => {
        const rows = sanitizedHtmlDiffs.split('\n').length;
        const lineHeight = 20;
        const minHeight = 100;
        const height = Math.max(minHeight, rows * lineHeight);
        return `${height}px`;
    };

    return (
        <div className='SingleChangePage' dangerouslySetInnerHTML={{ __html: sanitizedHtmlDiffs }} style={{ height: calculateHeight() }} />
    );
};

export default SingleChangePage;
