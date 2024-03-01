import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditorNavbar.css';

interface Props {
  onDashboardClick: () => void; 
  onSaveDraftClick: () => void;
  onShowModal: () => void;
}

const EditorNavbar: FC<Props> = ({ onDashboardClick, onSaveDraftClick, onShowModal}) => {
  
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
    </div>
  );
};

export default EditorNavbar;