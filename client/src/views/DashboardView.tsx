import React, { FC } from 'react';
import { useState, useEffect } from 'react';
import EditorView from './EditorView';
// import { Draft } from '../apiService/responseTypes';

const DashboardView: FC = () => {
  const [draftId, setDraftId] = useState<number | null>(null);
  // const [usersDrafts, setUsersDrafts] = useState<Draft[]>([])

  // const handleOnClick = () => {
  //   // TODO
  //   // open modal that creates new draft
  //   // create draft
  //   // redirect to editor with new draft id
  // }
  
  const openEditor = (id: number) => {
    setDraftId(id)
  }
  return (
    <div>
      {/* <button onClick={handleOnClick}>New Draft</button> */}
      <p>TODO A grid showing all the current users drafts</p>
      <button onClick={() => openEditor(1)}>Open Editor</button>
      {draftId !== null && <EditorView id={draftId} />}
    </div>
  );
};

export default DashboardView;
