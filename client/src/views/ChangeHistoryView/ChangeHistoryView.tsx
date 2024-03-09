import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//services
import { ChangeResponse, DraftResponse } from '../../types/responseTypes';
import { getDraft } from '../../apiService/DraftApi';
// components
import ChangeHistoryNavbar from '../../components/ChangeHistoryNavbar/ChangeHistoryNavbar';
import ChangeListItem from '../../components/ChangeListItem/ChangeListItem';
// utils
import { sortGroupChanges } from '../../utils/SortChangesUtil';
// styling
import './ChangeHistoryView.css';

interface LocationState {
  id: number,
}

const ChangeHistoryView: FC = () => {
  const [draft, setDraft] = useState<DraftResponse>({})
  const [draftChanges, setDraftChanges] = useState<ChangeResponse[]>([]);
  const location = useLocation();
  const { id } = location.state as LocationState;

  useEffect(() => {
    if (id !== undefined && id !== null) {
      async function retrieveDraft() {
        try {
          // get draft from api
          const usersDraft = await getDraft(id);
          setDraft(usersDraft);
          const { Changes } = usersDraft;
          setDraftChanges(Changes);
        } catch (error) {
          console.error(`Error retrieving draft with id: ${id}`, error);
        }
      }
      retrieveDraft();
    }
  }, [id]);

  // sort changes by date and divide by day
  const groupedChanges = sortGroupChanges(draftChanges);
  
  return (
    <div className='ChangeHistoryView'>
      <ChangeHistoryNavbar
        draftTitle={draft.title}
        draftId={id}
      />
      <div className='MainView'>
        <div className='ChangeList'>
        <h1 className='HistoryHeader'>{draft.title}</h1>
          {Object.entries(groupedChanges).map(([date, changesForDay]) => (
            <div className='SingleDay' key={date}>
              <h2 className='DateHeader'>{date}</h2>
              {changesForDay.map((change, index) => (
                <ChangeListItem key={index} change={change} draft={draft} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeHistoryView;
