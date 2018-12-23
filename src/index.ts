import * as Request from "request"
import chalk from 'chalk'

import { StepBase } from "./StepBase";
import { ActionStep } from "./ActionStep";
import { RequestStep } from "./RequestStep";

export class hubu {

    private steps: StepBase[] = [];

    constructor(private baseEndpointUrl?: string) {

    }

    public request(name: string, url?: string, request?: any, before?: (context: hubu) => void, after?: (context: hubu) => void): hubu {

        const step = new RequestStep();
        step.name = name;
        step.url = url;
        step.request = request;
        step.before = before;
        step.after = after = after;
        this.steps.push(step);

        return this;
    }

    public action(name: string, action: (context: hubu) => void): hubu {

        const step = new ActionStep();
        step.name = name;
        step.action = action;
    
        this.steps.push(step);

        return this;
    }

    public async start(): Promise<hubu> {

        for (const step of this.steps) {
            await this.executeStep(step);
        }

        return this;
    }

    public get Steps(): StepBase[] {
        return this.steps;
    }

    private async executeStep(step: StepBase): Promise<void> {

        console.log(`${chalk.green(`executeStep: ${step.name}`)}`)

        if (step instanceof ActionStep) {
            return step.action(this);
        }

        if (step instanceof RequestStep) {
            return this.executeRequestStep(step);
        }

        throw new Error("Don't have step to execute");
    }

    private async executeRequestStep(step: RequestStep): Promise<void> {

        if(step.before) {
            step.before(this);
        }

        step.response = await this.callApi(step);

        if(step.after) {
            step.after(this);
        }

        return;
    }

    private async callApi(step: RequestStep): Promise<any> {

        const options = {};
        const url: string | undefined = this.baseEndpointUrl
        ? `${this.baseEndpointUrl}${step.url}`
        : step.url;

        if (!url) {
            throw new Error("Endpoint url is not define");
        }

        return new Promise((resolve, reject) => {
            if (step.request) {
                Request.post(url, options, (error: any, response: Request.RequestResponse, body: any)  => {
                    return error 
                    ? reject(error)
                    : resolve(body);
                });
            } else {
                Request.get(url, (error: any, response: Request.RequestResponse, body: any)  => {
                    return error 
                    ? reject(error)
                    : resolve(body);
                });
            }
        });
    }
}