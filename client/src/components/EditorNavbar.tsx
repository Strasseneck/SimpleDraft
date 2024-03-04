import { FC } from 'react';
import DownloadDraftButton from './DownloadDraftButton';
import './EditorNavbar.css';

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
      <button onClick={onDashboardClick}>Dashboard</button>
      <button onClick={onChangeHistoryClick}>Draft History</button>
      <button onClick={onShowModal}>Save Change</button>
      <DownloadDraftButton draft={draft} title={title}/>
    </div>
  );
};

export default EditorNavbar;