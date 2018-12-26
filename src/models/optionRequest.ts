import { Hubu } from "../index";

export class OptionRequest {
    public url?: string;
    public haders?: { [key: string]: any };
    public request?: any;
    public before?: (context: Hubu) => void;
    public after?: (context: Hubu) => void;
}
