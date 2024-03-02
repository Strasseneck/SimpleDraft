import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getChange } from '../apiService/ChangeApi';
import { ChangeResponse } from '../apiService/responseTypes';
import { DiffMatchPatch, Diff, DiffOperation } from 'diff-match-patch-typescript';
import { useNavigate } from 'react-router-dom';
import SingleChangeNavbar from '../components/SingleChangeNavbar';
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
        navigate('/editor', { state: { draftId } });
      }    

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

    const onRevertClick = () => {
        // revert to that version
    }

    // Map over the array and extract Diff tuples
    const diffsConverted: Diff[] = diffs.map(({ operation, text }) => extractDiffFromObject({ operation, text }));
    const displayDiffs = dmp.diff_prettyHtml(diffsConverted);

    return (
        <div className='MainPageView'>
            {isReady && change && (
                <>
                    <SingleChangeNavbar
                        changeDescription={change.description}
                        draftTitle={draftTitle}
                        onDashboardClick={handleDashboardClick}
                        onEditorClick={() => handleEditorClick(1)}
                        onRevertClick={onRevertClick}
                    />
                    <div className='SingleChangeView' dangerouslySetInnerHTML={{ __html: displayDiffs }} />
                </>
            )}
        </div>
    );
}

export default SingleChangeView;
