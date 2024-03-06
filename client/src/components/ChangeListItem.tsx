import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ChangeResponse, DraftResponse } from '../apiService/responseTypes';
import './ChangeListItem.css';

interface ChangeListItemProps {
    draft: DraftResponse;
    change: ChangeResponse;
}

const ChangeListItem: React.FC<ChangeListItemProps> = ({ draft, change }) => {
    const { description, createdAt } = change;
    const formattedDate = moment(createdAt).format('MMMM Do YYYY, h:mm a');
    const navigate = useNavigate();

    const handleDescriptionClick = () => {
        const title = draft.title;
        const draftId = draft.id;
        navigate('/change', { state: { change, title, draftId } });
    };



    return (
        <div className="ChangeItem">
            <a onClick={handleDescriptionClick} style={{ cursor: 'pointer' }}>
                <p className='heading'>Description:</p>
                <p>{description}</p>
            </a>
            <p className='heading'>Created:</p>
            <p> {formattedDate}</p>
        </div>
    );
};

export default ChangeListItem;
