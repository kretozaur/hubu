import * as Request from "request";

import { ActionStep } from "./models/ActionStep";
import { OptionAction } from "./models/OptionAction";
import { OptionRequest } from "./models/OptionRequest";
import { RequestStep } from "./models/RequestStep";
import { Response } from "./models/Response";
import { StepBase } from "./models/StepBase";

export class Hubu {

    private steps: StepBase[] = [];

    constructor(private baseEndpointUrl?: string) {
    }

    public request(name: string, option: OptionRequest): Hubu {

        const { url, request, before, after } = option;

        const step = new RequestStep();
        step.name = name;
        step.url = url;
        step.request = request;
        step.before = before;
        step.after = after;
        this.steps.push(step);

        return this;
    }

    public action(name: string, option: OptionAction): Hubu {

        const { action } = option;

        const step = new ActionStep();
        step.name = name;
        step.action = action;

        this.steps.push(step);

        return this;
    }

    public async start(): Promise<Hubu> {

        for (const step of this.steps) {
            await this.executeStep(step);
        }

        return this;
    }

    public get Steps(): StepBase[] {
        return this.steps;
    }

    private async executeStep(step: StepBase): Promise<void> {

        if (step instanceof ActionStep) {
            return step.action(this);
        }

        if (step instanceof RequestStep) {
            return this.executeRequestStep(step);
        }

        throw new Error("Don't know step type");
    }

    private async executeRequestStep(step: RequestStep): Promise<void> {

        if (step.before) {
            step.before(this);
        }

        step.response = await this.callApi(step);

        if (step.after) {
            step.after(this);
        }

        return;
    }

    private async callApi(step: RequestStep): Promise<Response> {

        const options = {
            headers: step.request ? step.request.headers : undefined,
        };

        const url: string | undefined = this.baseEndpointUrl
        ? `${this.baseEndpointUrl}${step.url}`
        : step.url;

        if (!url) {
            throw new Error("Endpoint url is not define");
        }

        return new Promise((resolve, reject) => {
            if (step.request) {
                Request.post(url, options, (error: any, response: Request.RequestResponse, body: any)  => {
                    if (error) {
                        return reject(error);
                    }

                    const result = new Response();
                    result.body = body;
                    result.headers = response.headers;

                    resolve(result);
                });
            } else {
                Request.get(url, (error: any, response: Request.RequestResponse, body: any)  => {

                    if (error) {
                        return reject(error);
                    }

                    const result = new Response();
                    result.body = body;
                    result.headers = response.headers;

                    resolve(result);
                });
            }
        });
    }
}
