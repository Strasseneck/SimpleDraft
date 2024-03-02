import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ChangeResponse } from '../apiService/responseTypes';
import { getDraft } from '../apiService/DraftApi';
import ChangeHistoryNavbar from '../components/ChangeHistoryNavbar';
import ChangeListItem from '../components/ChangeListItem';
import './ChangeHistoryView.css';

interface LocationState {
  id: number,
}

const ChangeHistoryView: FC = () => {
  const [draftTitle, setDraftTitle] = useState<string>('');
  const [draftChanges, setDraftChanges] = useState<ChangeResponse[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state as LocationState;

  useEffect(() => {
    if (id !== undefined && id !== null) {
      async function retrieveDraft() {
        try {
          // get draft from api
          const usersDraft = await getDraft(id);
          // deconstruct the draft into states
          const { title, Changes } = usersDraft;
          setDraftTitle(title);
          setDraftChanges(Changes);
        } catch (error) {
          console.error(`Error retrieving draft with id: ${id}`, error);
        }
      }
      retrieveDraft();
    }
  }, [id]);


  // navigation
  const handleDashboardClick = () => {
    // navigate to dashboard
    navigate('/');
  };

  const handleEditorClick = (id: number) => {
    navigate('/editor', { state: { id } });
  }

  // sort changes by date
  const sortedChanges = draftChanges.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // group changes by day
  const groupedChanges = sortedChanges.reduce<{ [key: string]: ChangeResponse[] }>((accumulator, change) => {
    const date = new Date(change.createdAt).toLocaleDateString();
    accumulator[date] = accumulator[date] || [];
    accumulator[date].push(change);
    return accumulator;
  }, {});


  return (
    <div className='ChangeHistoryView'>
      <ChangeHistoryNavbar
        draftTitle={draftTitle}
        onDashboardClick={handleDashboardClick}
        onEditorClick={() => handleEditorClick(1)}
      />
      <div className='MainView'>
        <div className='ChangeList'>
        <h1 className='HistoryHeader'>History for {draftTitle}</h1>
          {Object.entries(groupedChanges).map(([date, changesForDay]) => (
            <div className='SingleDay' key={date}>
              <h2>{date}</h2>
              {changesForDay.map((change, index) => (
                <ChangeListItem key={index} change={change} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeHistoryView;
