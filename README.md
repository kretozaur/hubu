E2E - flow test

## Installation 

```
npm install hubu --save-dev
```
## Example
```javascript
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
```