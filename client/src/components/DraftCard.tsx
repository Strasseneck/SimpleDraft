import { FC } from 'react';
import moment from 'moment';
import { DraftResponse } from '../apiService/responseTypes';
import { useNavigate } from 'react-router-dom';
import './DraftCard.css'

interface Props {
  draft: DraftResponse;
}

const DraftCard: FC<Props> = ({ draft }) => {
  const { id, createdAt, updatedAt, Changes } = draft;
  const navigate = useNavigate();


  const formattedCreatedAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
  const formattedUpdatedAt = moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a');
  const changeCount = Changes.length;
  const lastChange = Changes.length > 0 ? Changes[0].description : 'No changes yet';

  const handleTitleClick = () => { 
    navigate('/editor', { state: { id} });
  }

  return (
    <div className='DraftCard'>
      <a onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
        <h3 className='heading'>Title: { draft.title }</h3>
      </a>
      <p className='heading'>Created:</p>
      <p>{ formattedCreatedAt}</p>
      <p className='heading'>Total Changes:</p>
      <p>{ changeCount }</p>
      <p className='heading'>Last Changed:</p>
      <p> { formattedUpdatedAt } </p>
      <p className='heading'>Lastest Change:</p>
      <p>{ lastChange }</p>
    </div>
  );
};

export default DraftCard;