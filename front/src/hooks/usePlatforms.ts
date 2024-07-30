import plateforms from "../data/plateforms";
import useData from "./useData";


export interface Platform{
	id: number;
	name: string;
	slug: string;
}

const usePlatforms = ()=> ({data: plateforms, isLoading: false, error: false});

export default usePlatforms;