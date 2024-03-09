import { useLocation } from 'react-router-dom';
// types
import { ChangeResponse } from '../../apiService/responseTypes';
// utils
import { createDiffsHTML } from '../../utils/DiffMatchPatchUtils';
// components
import SingleChangeNavbar from '../../components/SingleChangeNavbar/SingleChangeNavbar';
import SingleChangePage from '../../components/SingleChangePage/SingleChangePage';
// styling
import './SingleChangeView.css'

interface LocationState {
    change: ChangeResponse,
    draftTitle: string;
    draftId: number;
}

const SingleChangeView: React.FC = () => {
 
    const location = useLocation();
    const { change, draftTitle, draftId } = location.state as LocationState;
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
