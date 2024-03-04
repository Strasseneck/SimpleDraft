import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChangeResponse } from '../apiService/responseTypes';
import { revertDraft } from '../utils/DiffMatchPatchUtils';
import './EditorNavbar.css';
import { getDraft } from '../apiService/DraftApi';
import { getChange } from '../apiService/ChangeApi';

interface Props {
  change: ChangeResponse;
  draftTitle: string;
  draftId: number;
}

const SingleChangeNavbar: FC<Props> = ({ change, draftId }) => {
  const changeId = change.id;
  const navigate = useNavigate()

  const onDashboardClick = () => {
    navigate('/');
  }

  const onEditorClick = () => {
    const id = draftId;
    navigate('/editor', { state: { id }} )
  }

  const onDraftHistoryClick = () => {
    const id = draftId;
    navigate('/change-history', { state: { id }})
  }

  const onRevertClick = async () => {
    const draft = await getDraft(draftId);
    const endChange = await getChange(changeId)
    const test = revertDraft(draft, endChange);
    console.log(test);

  }

  return (
    <div className='EditorNavbar'>
      <button onClick={onDashboardClick}>Dashboard</button>
      <button onClick={onEditorClick}>Editor</button>
      <button onClick={onDraftHistoryClick}>Draft History</button>
      <button onClick={onRevertClick}>Revert</button>
    </div>
  );
};

export default SingleChangeNavbar;