import React, { FC } from 'react';

interface Props {
  onDashboardClick: () => void; 
  onSaveDraftClick: () => void;
  onShowModal: () => void;
}

const EditorNavbar: FC<Props> = ({ onDashboardClick, onSaveDraftClick, onShowModal}) => {

  return (
    <div className='EditorNavbar'>
      <button onClick={onDashboardClick}>Dashboard</button>
      <button onClick={onShowModal}>Save Change</button>
      <button onClick={onSaveDraftClick}>Save Draft</button>
    </div>
  );
};

export default EditorNavbar;