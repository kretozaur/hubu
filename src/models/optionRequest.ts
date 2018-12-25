import { hubu } from "../index";

export class optionRequest {
    url?: string;
    request?: any; 
    before?: (context: hubu) => void;
    after?: (context: hubu) => void;
}