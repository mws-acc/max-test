const request = require("supertest"); //supertest for making HTTP requests
const server = require("../server");

// closes server instance after all tests complete
afterAll((done) => {
  server.close(done);
});

test("should return all bucketlist items", async () => {
  const response = await request(server).get("/bucket");
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body).toHaveLength(3); //Checks we have initial 3 items
  expect(response.headers["content-type"]).toMatch(/application\/json/);
});

describe("POST /bucket", () => {
  // Happy case
  test("Should create a new bucketlist item", async () => {
    const newItemDescription = "Test item";
    const response = await request(server)
      .post("/bucket")
      .send({ description: newItemDescription });
    expect(response.status).toBe(201);
    expect(response.body.description).toBe(newItemDescription);
    expect(response.body.isComplete).toBe(false);
  });

  // Sad case
  test("Should return an error if no description is provided", async () => {
    const response = await request(server).post("/bucket").send({});
    expect(response.status).toBe(400);
  });
});

// TEST: PUT -- BUCKETLIST
describe("PUT /bucket/:id", () => {
  // Happy Case
  test("should update a bucketlist item", async () => {
    const itemId = "1";
    const response = await request(server).put(`/bucket/${itemId}`);
    expect(response.status).toBe(200);
    expect(response.body.isComplete).toBeDefined();
    expect(response.body.isComplete).toBe(true);
  });
});

// Sad Case
test("Should return error if item id does not exist", async () => {
  const itemId = "w345wsdf9";
  const response = await request(server).put(`/bucket/${itemId}`);
  expect(response.status).toBe(404);
  expect(response.body.error).toBeDefined();
  expect(response.body.error).toBe("Id does not exist for updating");
});
