import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangeHistoryNavbar.css';

interface Props {
    onDashboardClick: () => void;
    onEditorClick: () => void;
    draftTitle: string;
  }

const ChangeHistoryNavbar: FC<Props> = ({onDashboardClick, onEditorClick }) => {
  
  const navigate = useNavigate();


  return (
    <div className='ChangeHistoryNavbar'>
    <button onClick={onDashboardClick}>Dashboard</button>
    <button onClick={onEditorClick}>Editor</button>
      <h1>SimpleDraft</h1>
    </div>
  );
};

export default ChangeHistoryNavbar;