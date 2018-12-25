import { hubu } from "../../src";
import { RequestStep } from "../../src/models/RequestStep";

describe('integration test REST', function() {
    it('E2E test for REST api', (done) => {
        const e2e = new hubu("https://jsonplaceholder.typicode.com");

        e2e
            .request("[GET] users", { url: "/users" })
            .request("[GET] posts", { url: "/posts/1" })
            .request("[POST] post", { url: "/posts", request: { body: "Body 1" } })
            .request("[POST] post", { url: "/posts", before: (context) => {
                const step = context.Steps[2] as RequestStep;
                const post = JSON.parse(step.response);
                post.body = "Test body";
                step.request = post;
            }})
            .start()
            .then((context) => {
                done()
            })
            .catch((error) => done(error));
    });
});