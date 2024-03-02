import { FC } from 'react';
import './EditorNavbar.css';

interface Props {
  onDashboardClick: () => void;
  onChangeHistoryClick: () => void;
  onSaveDraftClick: () => void;
  onShowModal: () => void;
  draftTitle: string;
}

const EditorNavbar: FC<Props> = ({ onDashboardClick, onChangeHistoryClick, onSaveDraftClick, onShowModal, draftTitle}) => {
  
  return (
    <div className='EditorNavbar'>
      <button onClick={onDashboardClick}>Dashboard</button>
      <button onClick={onChangeHistoryClick}>Draft History</button>
      <button onClick={onShowModal}>Save Change</button>
      <button onClick={onSaveDraftClick}>Save Draft</button>
      <h2>{ draftTitle }</h2>
    </div>
  );
};

export default EditorNavbar;