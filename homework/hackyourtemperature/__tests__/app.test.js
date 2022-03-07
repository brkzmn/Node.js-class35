import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

describe("POST /weather", () => {
  it("Should response with a 200 status code", async () => {
    const response = await request.post("/weather").send({ city: "rotterdam" });
    expect(response.statusCode).toBe(200);
  });

  it("When city name is missing", async () => {
    const response = await request.post("/weather");
    expect(response.statusCode).toBe(400);
  });

  it("When city name is invalid", async () => {
    const response = await request.post("/weather").send({ city: "afsfagege" });
    expect(response.statusCode).toBe(404);
  });

  it("Should specify json in the content type header", async () => {
    const response = await request.post("/weather").send({ city: "rotterdam" });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  it("Response has weather result", async () => {
    const response = await request.post("/weather").send({ city: "Rotterdam" });
    expect(response.body.weatherText).toBeDefined();
  });
});
