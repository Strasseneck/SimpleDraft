import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import DashNavbar from '../components/DashNavbar';


const DashboardView: FC = () => {
  const navigate = useNavigate();

  const openEditor = (id: number) => {
    navigate('/editor', { state: { id } });
  };

  return (
    <div>
      < DashNavbar onDashboardClick={} />
      <p>TODO A grid showing all the current users drafts</p>
      <button onClick={() => openEditor(1)}>Open Editor</button>
    </div>
  );
};

export default DashboardView;