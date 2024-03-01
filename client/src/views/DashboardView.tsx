import React, { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Draft } from '../apiService/responseTypes';

const DashboardView: FC = () => {
  const [draftId, setDraftId] = useState<number | null>(null);
  const navigate = useNavigate();
  // const [usersDrafts, setUsersDrafts] = useState<Draft[]>([])
  
  const openEditor = (id: number) => {
    setDraftId(id)
    navigate('/editor', { state: { id }});
  }
  return (
    <div>
      {/* <button onClick={handleOnClick}>New Draft</button> */}
      <p>TODO A grid showing all the current users drafts</p>
      <button onClick={() => openEditor(1)}>Open Editor</button>
      {/* <button onClick={() => openEditor(1)}>Open Editor</button>
      {draftId !== null && <EditorView id={draftId} />} */}
    </div>
  );
};

export default DashboardView;
