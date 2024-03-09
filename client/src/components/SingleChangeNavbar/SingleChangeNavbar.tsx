import { FC } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
// services
import { getDraft } from '../../apiService/DraftApi';
// types
import { ChangeResponse, VersionResponse } from '../../apiService/responseTypes';
// utils
import { saveChange } from '../../utils/SaveChangeUtil';
//  styling
import './EditorNavbar.css';
import HistoryIcon from '@mui/icons-material/History';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';


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
    const original = draft.content;
    // revert the content
    const previousVersion: VersionResponse[] = draft.Versions.filter((version) => version.ChangeId === (changeId +1));
    const reverted = previousVersion[0].content;
    const formattedCreatedAt = moment(change.createdAt).format('MMMM Do YYYY, h:mm a');
    const description = `Reverted to state of script from ${formattedCreatedAt}`;
    const save = await saveChange(description, original, reverted, draftId )
    if (save) {
      onEditorClick();
    }

  }

  return (
    <div className='EditorNavbar'>
       <button onClick={onDashboardClick}><HomeIcon style={{ color: 'white' }} /></button>
       <button onClick={onEditorClick}><EditIcon style={{ color: 'white' }} /></button>
       <button onClick={onDraftHistoryClick}><HistoryEduIcon style={{ color: 'white' }} /></button>
      <button onClick={onRevertClick}><HistoryIcon style={{ color: 'white' }} /></button>
    </div>
  );
};

export default SingleChangeNavbar;