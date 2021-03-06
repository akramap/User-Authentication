// import request from "supertest";
// import httpStatus from "http-status";
// import chai from "chai";
// import app from "../../server.js";
// const { expect } = chai;

// chai.config.includeStack = true;

// describe("## Misc", () => {
//   describe("# GET /api/health-check", () => {
//     it("should return OK", done => {
//       request(app)
//         .get("/api/health-check")
//         .expect(httpStatus.OK)
//         .then(res => {
//           expect(res.text).to.equal("OK");
//           done();
//         })
//         .catch(done);
//     });
//   });

//   describe("# GET /api/404", () => {
//     it("should return 404 status", done => {
//       request(app)
//         .get("/api/404")
//         .expect(httpStatus.NOT_FOUND)
//         .then(res => {
//           expect(res.body.message).to.equal("Not Found");
//           done();
//         })
//         .catch(done);
//     });
//   });

//   describe("# Error Handling", () => {
//     it("should handle not found case - ObjectId not found", done => {
//       request(app)
//         .get("/api/samples/56z787zzz67fc")
//         .expect(httpStatus.INTERNAL_SERVER_ERROR)
//         .then(res => {
//           expect(res.body.message).to.equal("Data not found");
//           done();
//         })
//         .catch(done);
//     });

//     it("should handle express validation error - username is required", done => {
//       request(app)
//         .post("/api/samples")
//         .send({
//           name: "Raghav",
//         })
//         .expect(httpStatus.BAD_REQUEST)
//         .then(res => {
//           expect(res.body.message).to.equal("email is required");
//           done();
//         })
//         .catch(done);
//     });
//   });
// });
