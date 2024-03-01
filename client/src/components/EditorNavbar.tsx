import React, { FC } from 'react';
interface Props {
  onDashboardClick: () => void; 
  onSaveChangeClick: () => void; 
  onSaveDraftClick: () => void; 
}

const EditorNavbar: FC<Props> = ({ onDashboardClick, onSaveChangeClick, onSaveDraftClick }) => {

  return (
    <div className='EditorNavbar'>
      <button onClick={onDashboardClick}>Dashboard</button>
      <button onClick={onSaveChangeClick}>Save</button>
      <button onClick={onSaveDraftClick}>Save Draft</button>
    </div>
  );
};

export default EditorNavbar;