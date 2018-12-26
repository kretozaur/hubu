import { hubu } from "../index";

export class optionRequest {
    url?: string;
    haders?: { [key: string]: any };
    request?: any; 
    before?: (context: hubu) => void;
    after?: (context: hubu) => void;
}