import { FC } from 'react';
import HTMLReactParser from 'html-react-parser/lib/index';
import './SingleChangePage.css';

interface Props {
    sanitizedHtmlDiffs: string;
}

const SingleChangePage: FC<Props> = ({ sanitizedHtmlDiffs }) => {

    return (
        <div className='SingleChangePage' >
            <div>{ HTMLReactParser(sanitizedHtmlDiffs)}</div>
        </div>
    );
};

export default SingleChangePage;
