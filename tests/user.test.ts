import {describe, expect, it} from "vitest";
import request from "supertest";
import app from "../src/app";

describe("POST /api/users", () => {
    it("rejects a user with an invalid email", async () => {

        const response = await request(app)
        .post("/api/users")
        .send({
            username: "johnMusic",
            email:"not-an-email",
            
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid user data");

    });

    it("rejects a username shorter than 3 characters", async () => {

            const response = await request(app)
            .post("/api/users")
            .send({
                username: "jo",
                email: "john@example.com",
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Invalid user data");

        });

    });
