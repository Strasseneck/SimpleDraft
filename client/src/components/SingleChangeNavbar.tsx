import { FC } from 'react';
import './EditorNavbar.css';

interface Props {
  onDashboardClick: () => void;
  onEditorClick: () => void;
  onDraftHistoryClick: () => void;
  onRevertClick: () => void;
  changeDescription: string;
  draftTitle: string;
}

const SingleChangeNavbar: FC<Props> = ({ onDashboardClick, onEditorClick, onDraftHistoryClick, onRevertClick, changeDescription, draftTitle }) => {

  return (
    <div className='EditorNavbar'>
      <button onClick={onDashboardClick}>Dashboard</button>
      <button onClick={onEditorClick}>Editor</button>
      <button onClick={onDraftHistoryClick}>Draft History</button>
      <button onClick={onRevertClick}>Revert</button>
      <h2>{draftTitle}</h2>
      <h2>{changeDescription}</h2>
    </div>
  );
};

export default SingleChangeNavbar;