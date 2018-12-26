import { hubu } from "../index";
import { StepBase } from "./StepBase";
import { Request } from "./Request";
import { Response } from "./Response";

export class RequestStep extends StepBase {
    url?: string;
    request?: Request;
    response?: Response;
    before?: (context: hubu) => void;
    after?: (context: hubu) => void;
}