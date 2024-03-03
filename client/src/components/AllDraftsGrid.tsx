import { FC } from 'react';
import { DraftResponse } from '../apiService/responseTypes';
import DraftCard from './DraftCard';
import './AllDraftsGrid.css'

interface Props {
    drafts: DraftResponse[];
}

const AllDraftsGrid: FC<Props> = ({ drafts }) => {

  return (
    <div className='AllDraftsGrid'>
    {drafts.map((draft) => (
        <DraftCard key={draft.id} draft={draft} />
    ))}
</div>
  );
};

export default AllDraftsGrid;
