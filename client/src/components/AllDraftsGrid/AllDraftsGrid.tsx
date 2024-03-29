import { FC} from 'react';
// types
import { DraftResponse } from '../../types/responseTypes';
// components
import DraftCard from '../DraftCard/DraftCard';
// styling
import './AllDraftsGrid.css'

interface Props {
    drafts: DraftResponse[];
    handleDeleteDraft: (draftId: number) => void;
}

const AllDraftsGrid: FC<Props> = ({ drafts, handleDeleteDraft}) => {


  return (
    <div className='AllDraftsGrid'>
    {drafts.map((draft) => (
        <DraftCard key={draft.id} draft={draft} onDelete={handleDeleteDraft} />
    ))}
</div>
  );
};

export default AllDraftsGrid;


