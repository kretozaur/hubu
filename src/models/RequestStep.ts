import { hubu } from "../index";
import { StepBase } from "./StepBase";

export class RequestStep extends StepBase {
    url?: string;
    request?: any;
    response?: any;
    before?: (context: hubu) => void;
    after?: (context: hubu) => void;
}