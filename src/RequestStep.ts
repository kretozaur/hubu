import { flowTest } from ".";
import { StepBase } from "./StepBase";

export class RequestStep extends StepBase {
    url?: string;
    request?: any;
    response?: any;
    before?: (context: flowTest) => void;
    after?: (context: flowTest) => void;
}