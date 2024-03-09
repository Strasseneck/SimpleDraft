import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
// services 
import { deleteDraft } from '../../apiService/DraftApi';
// types
import { DraftResponse } from '../../apiService/responseTypes';
// styling
import './DraftCard.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  draft: DraftResponse;
  onDelete: (draftId: number) => void;
}

const DraftCard: FC<Props> = ({ draft, onDelete }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const { id, title, createdAt, updatedAt, Changes } = draft;
  const navigate = useNavigate();

  const formattedCreatedAt = moment(createdAt).format('MMMM Do YYYY, h:mm a');
  const formattedUpdatedAt = moment(updatedAt).format('MMMM Do YYYY, h:mm a');
  const changeCount = Changes.length;
  const lastChange = Changes.length > 0 ? Changes[changeCount - 1].description : 'No changes yet';

  const handleTitleClick = () => {
    navigate('/editor', { state: { id } });
  }

  const handleCloseClick = () => {
    setShowDelete(true);
  }

  const handleDelete = async (confirm: boolean) => {
    if (confirm) {
      // delete draft
      await deleteDraft(id);
      onDelete(id);
      setShowDelete(false)
    } else {
      setShowDelete(false);
    }
  }

  return (
    <div className='DraftCard'>
        {!showDelete && (
            <div className='HoverCard'> 
                <button onClick={handleTitleClick}><EditIcon style={{color: 'var(--paper-color)'}} /></button>
                <button onClick={handleCloseClick}><DeleteIcon style={{color: 'var(--paper-color)'}} /></button>
            </div>
        )}
        {showDelete ? (
            <div>
                <h3 className='heading'> Delete Draft</h3>
                <p>Are you sure you want to delete "{title}" ?</p>
                <div className='ButtonContainer'>
                    <button className='DeleteButton' onClick={() => handleDelete(true)}>Yes</button>
                    <button className='DeleteButton' onClick={() => handleDelete(false)}>No</button>
                </div>
            </div>
        ) : (
            <>
                <a className="link" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
                    <h3 className='heading'>Title: {draft.title}</h3>
                </a>
                <p className='heading'>Created:</p>
                <p>{formattedCreatedAt}</p>
                <p className='heading'>Total Changes:</p>
                <p>{changeCount}</p>
                <p className='heading'>Last Changed:</p>
                <p> {formattedUpdatedAt} </p>
                <p className='heading'>Latest Change:</p>
                <p>{lastChange}</p>
            </>
        )}
    </div>
);


};

export default DraftCard;