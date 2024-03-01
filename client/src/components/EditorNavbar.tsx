import React, { FC } from 'react';
import './EditorNavbar.css';

interface Props {
  onDashboardClick: () => void; 
  onSaveDraftClick: () => void;
  onShowModal: () => void;
}

const EditorNavbar: FC<Props> = ({ onDashboardClick, onSaveDraftClick, onShowModal}) => {
  return (
    <div className='EditorNavbar'>
      <button onClick={onShowModal}>Save Change</button>
      <button onClick={onSaveDraftClick}>Save Draft</button>
      <button onClick={onDashboardClick}>Dashboard</button>
    </div>
  );
};

export default EditorNavbar;