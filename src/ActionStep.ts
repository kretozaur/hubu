import { hubu } from ".";
import { StepBase } from "./StepBase";

export class ActionStep extends StepBase {
    action: (context: hubu) => void;
}