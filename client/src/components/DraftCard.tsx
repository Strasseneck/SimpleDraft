import { FC } from 'react';
import moment from 'moment';
import { DraftResponse } from '../apiService/responseTypes';
import './DraftCard.css'

interface Props {
  draft: DraftResponse;
}

const DraftCard: FC<Props> = ({ draft }) => {
  const { createdAt, updatedAt, Changes } = draft;
  const formattedCreatedAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
  const formattedUpdatedAt = moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a');
  const changeCount = Changes.length;
  const lastChange = Changes[0].description;


  return (
    <div className='DraftCard'>
      <h3 className='heading'>Title: { draft.title }</h3>
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