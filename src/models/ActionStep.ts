import { Hubu } from "../index";
import { StepBase } from "./StepBase";

export class ActionStep extends StepBase {
    public action: (context: Hubu) => void;
}
