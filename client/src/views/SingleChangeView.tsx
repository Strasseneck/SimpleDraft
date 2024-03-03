import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getChange } from '../apiService/ChangeApi';
import { ChangeResponse } from '../apiService/responseTypes';
import { createDiffsHTML } from '../utils/DiffMatchPatchUtils';
import SingleChangeNavbar from '../components/SingleChangeNavbar';
import SingleChangePage from '../components/SingleChangePage';
import './SingleChangeView.css'

interface LocationState {
    id: number,
    draftTitle: string;
    draftId: number;
}

const SingleChangeView: React.FC = () => {
    const [change, setChange] = useState<ChangeResponse>()
    const [diffs, setDiffs] = useState<Diff[]>([]);
    const [isReady, setIsReady] = useState<boolean>(false);
    const location = useLocation();
    const { id, draftTitle, draftId } = location.state as LocationState;

    const handleRevertClick = () => {
        // revert to that version
    };

    useEffect(() => {
        if (id !== undefined && id !== null) {
            async function retrieveChange() {
                try {
                    // get change from api
                    const currentChange = await getChange(id);
                    const { Diffs } = currentChange;
                    setDiffs(Diffs)
                    setChange(currentChange);
                    setIsReady(true);
                } catch (error) {
                    console.error(`Error retrieving change with id ${id}`)
                }
            }
            retrieveChange()
        }
    }, [id]);

    const diffsDisplay = createDiffsHTML(diffs);
    
    return (
        <div className='MainPageView'>
            {isReady && change && (
                <div>
                    <SingleChangeNavbar
                        changeDescription={change.description}
                        draftTitle={draftTitle}
                        draftId={draftId}
                        onRevertClick={handleRevertClick}
                    />
                    <div className='SingleChangeView'>
                        < SingleChangePage sanitizedHtmlDiffs={diffsDisplay} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleChangeView;
