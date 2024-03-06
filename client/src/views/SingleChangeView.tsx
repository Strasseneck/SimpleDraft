import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// services 
import { getChange } from '../apiService/ChangeApi';
// types
import { Diff } from 'diff-match-patch-typescript';
import { ChangeResponse, VersionResponse } from '../apiService/responseTypes';
// utils
import { createDiffsHTML } from '../utils/DiffMatchPatchUtils';
// components
import SingleChangeNavbar from '../components/SingleChangeNavbar';
import SingleChangePage from '../components/SingleChangePage';
// styling
import './SingleChangeView.css'

interface LocationState {
    change: ChangeResponse,
    draftTitle: string;
    draftId: number;
    version: VersionResponse;
}

const SingleChangeView: React.FC = () => {
    // const [change, setChange] = useState<ChangeResponse>()
    // const [diffs, setDiffs] = useState<Diff[]>([]);
    // const [isReady, setIsReady] = useState<boolean>(false);
    const location = useLocation();
    const { change, draftTitle, draftId } = location.state as LocationState;

    // useEffect(() => {
    //     if (id !== undefined && id !== null) {
    //         async function retrieveChange() {
    //             try {
    //                  // get change from api
    //                  const currentChange = await getChange(id);
    //                  const currentDiffs = currentChange.Diffs;
    //                  console.log(currentDiffs.length)
    //                  setDiffs(currentDiffs);
    //                  setChange(currentChange);
    //                  setIsReady(true);
    //             } catch (error) {
    //                 console.error(`Error retrieving change with id ${id}`)
    //             }
    //         }
    //         retrieveChange()
    //     }
    // }, [id]);

    const currentDiffs = change.Diffs;
    
    const diffsDisplay = createDiffsHTML(currentDiffs);

    return (
        <div className='MainPageView'>
            {/* {isReady && change && ( */}
                <div>
                    <SingleChangeNavbar
                        change={change}
                        draftTitle={draftTitle}
                        draftId={draftId}
                    />
                    <div className='SingleChangeView'>
                        < SingleChangePage sanitizedHtmlDiffs={diffsDisplay} />
                    </div>
                </div>
            {/* )} */}
        </div>
    );
}

export default SingleChangeView;
