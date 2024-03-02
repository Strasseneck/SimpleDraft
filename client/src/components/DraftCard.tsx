import { FC } from 'react';
import { DraftResponse } from '../apiService/responseTypes';

interface Props {
  draft: DraftResponse;
}

const DraftCard: FC<Props> = ({ draft }) => {
  // Component logic here

  return (
    <div>
      {draft.title}
    </div>
  );
};

export default DraftCard;