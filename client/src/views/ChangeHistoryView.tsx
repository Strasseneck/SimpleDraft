import { FC } from 'react';
import { useLocation } from 'react-router-dom';

interface LocationState {
  id: number,
}

const ChangeHistoryView: FC = () => {

  const location = useLocation();
  const { id } = location.state as LocationState;

  return (
    <div>
      <p>Change History Working</p>
      <p>{ id }</p>
          
    </div>
  );
};

export default ChangeHistoryView;
