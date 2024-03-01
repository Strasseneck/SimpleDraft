import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardView: FC = () => {
  const navigate = useNavigate();

  const openEditor = (id: number) => {
    navigate('/editor', { state: { id } });
  };

  return (
    <div>
      <p>TODO A grid showing all the current users drafts</p>
      <button onClick={() => openEditor(1)}>Open Editor</button>
    </div>
  );
};

export default DashboardView;

