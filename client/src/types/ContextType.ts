import { DraftResponse } from "./responseTypes";
import { Dispatch, SetStateAction } from "react";

export type ArtistListContext = {
    drafts: DraftResponse[];
    setDrafts: Dispatch<SetStateAction<DraftResponse[]>>;
}
