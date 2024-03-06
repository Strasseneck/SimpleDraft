import { FC } from 'react';
import DownloadDraftButton from './DownloadDraftButton';
import './EditorNavbar.css';
import SaveIcon from '@mui/icons-material/Save';
import HistoryIcon from '@mui/icons-material/History';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import HomeIcon from '@mui/icons-material/Home';

interface Props {
  onDashboardClick: () => void;
  onChangeHistoryClick: () => void;
  onShowModal: () => void;
  title: string,
  draft: string,
}

const EditorNavbar: FC<Props> = ({ onDashboardClick, onChangeHistoryClick, onShowModal, draft, title }) => {

  return (
    <div className='EditorNavbar'>
      <button onClick={onDashboardClick}><HomeIcon style={{ color: 'white' }} /></button>
      <button onClick={onChangeHistoryClick}><HistoryEduIcon style={{ color: 'white' }} /></button>
      <button onClick={onShowModal}><SaveIcon style={{ color: 'white' }} />
      </button>
      <DownloadDraftButton draft={draft} title={title}/>
    </div>
  );
};

export default EditorNavbar;