import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getChange } from '../apiService/ChangeApi';
import { ChangeResponse } from '../apiService/responseTypes';
import { DiffMatchPatch, Diff, DiffOperation } from 'diff-match-patch-typescript';
import './SingleChangeView.css'


interface DiffAttributes {
    id?: number;
    operation: keyof typeof DiffOperation;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
    ChangeId: number;
}

interface LocationState {
    id: number,
}

const SingleChangeView: React.FC = () => {
    const [change, setChange] = useState<ChangeResponse>()
    const [diffs, setDiffs] = useState<Diff[]>([]);
    const [isReady, setIsReady] = useState<boolean>(false);
    const location = useLocation();
    const { id } = location.state as LocationState;
    const dmp = new DiffMatchPatch;

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
    console.log(displayDiffs)

    return (
        /// this bad but I can't for the lift of me work out a safer way to do it!
        <div dangerouslySetInnerHTML={{ __html: displayDiffs }} />
    )
}

export default SingleChangeView;
