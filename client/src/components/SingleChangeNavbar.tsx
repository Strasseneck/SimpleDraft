import { FC } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
// services
import { getDraft } from '../apiService/DraftApi';
import { getChange } from '../apiService/ChangeApi'
// types
import { ChangeResponse } from '../apiService/responseTypes';
// utils
import { createDraft, revertDraft } from '../utils/DiffMatchPatchUtils';
import { saveChange } from '../utils/SaveChangeUtil';
//  styling
import './EditorNavbar.css';


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
    const originalDraft = createDraft(draft);
    // revert the content
    const revertedDraft = await revertDraft(draft, endChange, draftId);
    const formattedCreatedAt = moment(change.createdAt).format('MMMM Do YYYY, h:mm a');
    const description = `Reverted to state of script from ${formattedCreatedAt}`;
    const save = await saveChange(description, originalDraft, revertedDraft, draftId )
    if (save) {
      onEditorClick();
    }

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