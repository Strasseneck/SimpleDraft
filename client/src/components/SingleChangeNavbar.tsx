import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditorNavbar.css';

interface Props {
  onRevertClick: () => void;
  changeDescription: string;
  draftTitle: string;
  draftId: number;
}

const SingleChangeNavbar: FC<Props> = ({ onRevertClick, changeDescription, draftTitle, draftId }) => {
  console.log(`draftId: ${draftId}`)
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