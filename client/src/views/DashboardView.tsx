import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashNavbar from '../components/DashNavbar';
import { DraftResponse } from '../apiService/responseTypes';
import { getAllDrafts } from '../apiService/DraftApi';
import AllDraftsGrid from '../components/AllDraftsGrid';


const DashboardView: FC = () => {
  const [allDrafts, setAllDrafts] = useState<DraftResponse[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function retrieveAllDrafts () {
      try {
        // get all drafts from api
        const drafts = await getAllDrafts();
        setAllDrafts(drafts);
        console.log(drafts)
        setIsReady(true);
      } catch (error) {
        console.error(`Error getting all drafts ${error}`)
      }
    }
    retrieveAllDrafts()
  }, [])

  const openEditor = (id: number) => {
    navigate('/editor', { state: { id } });
  };

  return (
    <div>
      < DashNavbar />
      {isReady && <AllDraftsGrid />}
      <button onClick={() => openEditor(1)}>Open Editor</button>
    </div>
  );
};

export default DashboardView;