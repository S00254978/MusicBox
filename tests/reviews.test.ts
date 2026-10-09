import {describe, expect,it} from "vitest";
import request from "supertest";
import app from "../src/app";

describe("POST /api/reviews", () => {

    it("rejects a rating outside the allowed range", async () => {
        
        const response = await request(app)
        .post("/api/reviews")
        .send({
            userId: "000000000000000000000000",
                spotifyAlbumId: "test-album-001",
                rating: 6,
                text: "Invalid rating",
                listenedAt: "2026-06-01T12:00:00Z",
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid review data");

    });

});

describe("GET /api/reviews/:reviewId", () => {
    it("returns 400 for a malformed reviewId", async () => {

        const response = await request(app)
        .get("/api/reviews/malformed-review-id");
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid reviewId");

    });

});
