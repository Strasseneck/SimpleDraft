import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getChange } from '../apiService/ChangeApi';
import { ChangeResponse } from '../apiService/responseTypes';
import { DiffMatchPatch, Diff, DiffOperation } from 'diff-match-patch-typescript';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';


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
    const dmp = new DiffMatchPatch;
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        // navigate to dashboard
        navigate('/');
    };

    const handleEditorClick = (draftId: number) => {
        const id = draftId;
        navigate('/editor', { state: { id } });
    };

    const handleDraftHistoryClick = (draftId: number) => {
        const id = draftId;
        navigate('/change-history', { state: { id } });
    }

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

    // Function to destructure objects into Diff tuples
    function extractDiffFromObject(diffObject: { operation: keyof typeof DiffOperation; text: string }): Diff {
        const { operation, text } = diffObject;
        return [DiffOperation[operation], text];
    }

    // Map over the array and extract Diff tuples
    const diffsConverted: Diff[] = diffs.map(({ operation, text }) => extractDiffFromObject({ operation, text }));
    const displayDiffs = dmp.diff_prettyHtml(diffsConverted);
    const sanitizedHtmlDiffs = DOMPurify.sanitize(displayDiffs);


    // const calculateHeight = () => {
    //     const rows = displayDiffs.split('\n').length;
    //     const lineHeight = 20;
    //     const minHeight = 100;
    //     const height = Math.max(minHeight, rows * lineHeight);
    //     return `${height}px`;
    // };

    return (
        <div className='MainPageView'>
            {isReady && change && (
                <div>
                    <SingleChangeNavbar
                        changeDescription={change.description}
                        draftTitle={draftTitle}
                        onDashboardClick={handleDashboardClick}
                        onEditorClick={() => handleEditorClick(1)}
                        onDraftHistoryClick={() => handleDraftHistoryClick(1)}
                        onRevertClick={handleRevertClick}
                    />
                    <div className='SingleChangeView'>
                        < SingleChangePage sanitizedHtmlDiffs={sanitizedHtmlDiffs} />
                    </div>
                    {/* <div className='SingleChangeView' dangerouslySetInnerHTML={{ __html: sanitizedHtmlDiffs }} style={{ height: calculateHeight() }} /> */}
                </div>
            )}
        </div>
    );
}

export default SingleChangeView;
