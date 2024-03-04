import { FC } from 'react';
import './EditorNavbar.css';

interface Props {
  onDashboardClick: () => void;
  onChangeHistoryClick: () => void;
  onShowModal: () => void;
}

const EditorNavbar: FC<Props> = ({ onDashboardClick, onChangeHistoryClick, onShowModal }) => {


  
  return (
    <div className='EditorNavbar'>
      <button onClick={onDashboardClick}>Dashboard</button>
      <button onClick={onChangeHistoryClick}>Draft History</button>
      <button onClick={onShowModal}>Save Change</button>
    </div>
  );
};

export default EditorNavbar;