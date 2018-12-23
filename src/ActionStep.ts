import { flowTest } from ".";
import { StepBase } from "./StepBase";

export class ActionStep extends StepBase {
    action: (context: flowTest) => void;
}