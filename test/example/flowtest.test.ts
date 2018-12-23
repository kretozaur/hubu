import { hubu } from "../../src";
import { RequestStep } from "../../src/RequestStep";

describe('Flow test', function() {
    it('E2E test for REST api', (done) => {
        const e2e = new hubu("https://jsonplaceholder.typicode.com");

        e2e
            .request("users", "/users" )
            .request("posts", "/posts/1")
            .request("posts", "/posts", { body: "Body 1" })
            .request("posts", "/posts", { }, (context) => {
                const step = context.Steps[2] as RequestStep;
                const post = JSON.parse(step.response);
                post.body = "Test body";
                step.request = post;
            })
            .start()
            .then((flow) => {
                done()
            })
            .catch((error) => done(error));
    });
});