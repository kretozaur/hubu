# hubu [![Build Status](https://travis-ci.org/kretozaur/hubu.png)](https://travis-ci.org/kretozaur/hubu)

E2E - flow test

## Installation 

```
npm install hubu --save-dev
```
## Example
```typescript
it('E2E test for REST api', (done) => {
    const e2e = new hubu("https://endpoint.com);
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
```