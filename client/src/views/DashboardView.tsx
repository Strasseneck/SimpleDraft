import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashNavbar from '../components/DashNavbar';
import { DraftResponse } from '../apiService/responseTypes';
import { getAllDrafts } from '../apiService/DraftApi';
import { addDraft } from '../apiService/DraftApi';

import AllDraftsGrid from '../components/AllDraftsGrid';
import NewDraftModal from '../components/NewDraftModal';


const DashboardView: FC = () => {
  const [allDrafts, setAllDrafts] = useState<DraftResponse[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function retrieveAllDrafts() {
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

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const handleNewDraftClick = async (title: string) => {
    // try to create a new draft
    const newDraft = await addDraft(title);
    const id = newDraft.id;
    // open editor with new draft
    navigate('/editor', { state: { id }} )
    try {
      
    } catch (error) {
      console.error(`Error creating draft with title ${title}, ${error}`)
    }
    
  }

  return (
    <div>
      < DashNavbar onShowModal={show} />
      {isReady && allDrafts && <AllDraftsGrid drafts={allDrafts} />
      }
      <NewDraftModal visible={visible} onClose={hide} handleNewDraftClick={handleNewDraftClick} />
      <button onClick={() => openEditor(1)}>Open Editor</button>
    </div>
  );
};

export default DashboardView;