import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getChange } from '../apiService/ChangeApi';
import { ChangeResponse } from '../apiService/responseTypes';
import { Diff } from 'diff-match-patch-typescript';


interface LocationState {
    id: number,
}

const SingleChangeView: React.FC = () => {
    const [change, setChange] = useState<ChangeResponse>()
    const [diffs, setDiffs] = useState<Diff[]>([]);
    const [isReady, setIsReady] = useState<boolean>(false);
    const location = useLocation();
    const { id } = location.state as LocationState;

    useEffect(() => {
        if (id !== undefined && id !== null) {
            async function retrieveChange() {
                try {
                    // get change from api
                    const currentChange = await getChange(id);
                    const { Diffs } = currentChange;
                    setDiffs(Diffs)
                    // diffs.forEach(diff => {
                    //     const [operation, text] = diff
                    //     console.log(operation); 
                    //     console.log(text);      
                    // });
                    setChange(currentChange);
                    setIsReady(true);
                } catch (error) {
                    console.error(`Error retrieving change with id ${id}`)
                }
            }
            retrieveChange()
        }
    }, [id]);

    return (
        <div className='SingleChangeView'>
            {isReady && change !== undefined && <div>
                {diffs.map((diff: Diff,  index: number) => (
                    <p key={index}>
                        { diff.operation }
                        { diff.text }
                    </p>
                ))}
                <p>{change.description}</p>
            </div>}
        </div>
    )
}

export default SingleChangeView;
