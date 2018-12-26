import { Hubu } from "../index";
import { Request } from "./Request";
import { Response } from "./Response";
import { StepBase } from "./StepBase";

export class RequestStep extends StepBase {
    public url?: string;
    public request?: Request;
    public response?: Response;
    public before?: (context: Hubu) => void;
    public after?: (context: Hubu) => void;
}
