import React from 'react';
import moment from 'moment'; // Import Moment.js
import { ChangeResponse } from '../apiService/responseTypes';
import './ChangeListItem.css';

interface ChangeListItemProps {
    change: ChangeResponse;
}

const ChangeListItem: React.FC<ChangeListItemProps> = ({ change }) => {
    const { description, createdAt } = change;

    const formattedDate = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');

    return (
        <div className="ChangeItem">
            <h3>Description: {description}</h3>
            <p>Created At: {formattedDate}</p>
        </div>
    );
};

export default ChangeListItem;
