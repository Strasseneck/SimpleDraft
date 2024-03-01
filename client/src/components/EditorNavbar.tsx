import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditorNavbar.css';

interface Props {
  onDashboardClick: () => void; 
  onSaveDraftClick: () => void;
  onShowModal: () => void;
  draftTitle: string;
}

const EditorNavbar: FC<Props> = ({ onDashboardClick, onSaveDraftClick, onShowModal, draftTitle}) => {
  
  const navigate = useNavigate();


  const onChangeHistoryClick = () => {
    navigate('/change-history')
}

  return (
    <div className='EditorNavbar'>
      <button onClick={onDashboardClick}>Dashboard</button>
      <button onClick={onChangeHistoryClick}>Changes</button>
      <button onClick={onShowModal}>Save Change</button>
      <button onClick={onSaveDraftClick}>Save Draft</button>
      <h2>{ draftTitle }</h2>
    </div>
  );
};

export default EditorNavbar;