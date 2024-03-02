import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ChangeResponse } from '../apiService/responseTypes';
import './ChangeListItem.css';

interface ChangeListItemProps {
    change: ChangeResponse;
}

const ChangeListItem: React.FC<ChangeListItemProps> = ({ change }) => {
    const { description, createdAt, id } = change;
    const formattedDate = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
    const navigate = useNavigate();

    const handleDescriptionClick = () => {
        navigate('/change', { state: { id } });
    };

    return (
        <div className="ChangeItem">
            <a onClick={handleDescriptionClick} style={{ cursor: 'pointer' }}>
                Description: {description}
            </a>
            <p>Created At: {formattedDate}</p>
        </div>
    );
};

export default ChangeListItem;
