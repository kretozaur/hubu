import { hubu } from "../../src";
import { RequestStep } from "../../src/models/RequestStep";

describe('integration test REST', function() {
    it('E2E test for REST api', (done) => {
        const e2e = new hubu("https://jsonplaceholder.typicode.com");

        e2e
            .request("[GET] get user", { url: "/users" })
            .request("[GET] get post", { url: "/posts/1" })
            .request("[POST] update post 1", { url: "/posts", request: { body: "Body 1" } })
            .request("[POST] login", { url: "/posts", before: (context) => {
                const step = context.Steps[2] as RequestStep;

                if (step.response) {
                    const post = JSON.parse(step.response.body);
                    post.body = "Test body";
                    step.request = post;
                }
            }})
            .action("Set session", { action: (context) => {
                const step = context.Steps[2] as RequestStep;
                
                if (step.response && step.request){
                    const sessionId = step.response.headers["sessionId"]
                    step.request.headers = {};
                    step.request.headers["sessionId"] = sessionId;
                    step.request.body = {};
                }
            }})
            .start()
            .then((context) => {
                done();
            })
            .catch((error) => done(error));
    });
});