import React, { FC } from 'react';

interface Props {
  onDashboardClick: () => void; 
  onSaveChangeClick: () => void; 
  onSaveDraftClick: () => void;
  onShowModal: () => void;
}

const EditorNavbar: FC<Props> = ({ onDashboardClick, onSaveChangeClick, onSaveDraftClick, onShowModal}) => {

  const handleSaveChangeClick = () => {
    onSaveChangeClick(); 
    onShowModal(); 
  };

  return (
    <div className='EditorNavbar'>
      <button onClick={onDashboardClick}>Dashboard</button>
      <button onClick={handleSaveChangeClick}>Save Change</button>
      <button onClick={onSaveDraftClick}>Save Draft</button>
    </div>
  );
};

export default EditorNavbar;