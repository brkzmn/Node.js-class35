import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

describe("POST /weather", () => {
  it("city name is missing", async () => {
    const response = await request.post("/weather");
    expect(response.statusCode).toBe(400);
  });
  it("Should specify json in the content type header", async () => {
    const response = await request.post("/weather").send({ city: "rotterdam" });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});
