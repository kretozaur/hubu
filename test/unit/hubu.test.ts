import * as chai from "chai";

import { Hubu as HUBU } from "../../src/index";

const expect = chai.expect;

describe("hubu unit test", function() {

    this.timeout(2000);

    it("Should throw exception", (done) => {
        const hubu = new HUBU();

        hubu.Steps.push({} as any);
        hubu
            .start()
            .then(() => done("Should throw exception"))
            .catch((error) => {
                expect(error.message).be.equal("Don't know step type");
                done();
            });
    });

    it("Should execute one action", (done) => {
        const hubu = new HUBU();

        hubu
            .action("action #1", { action: (context) => {
                const length = context.Steps.length;
            }})
            .start()
            .then((context) => {
                expect(context.Steps.length).be.equal(1);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it("Should execute one request", (done) => {
        const hubu = new HUBU();

        hubu
            .request("action #1", { url: "http://test.com", request: {} })
            .start()
            .then((context) => {
                expect(context.Steps.length).be.equal(1);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});
