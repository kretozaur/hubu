import { hubu } from "../index";
import { StepBase } from "./StepBase";

export class ActionStep extends StepBase {
    action: (context: hubu) => void;
}