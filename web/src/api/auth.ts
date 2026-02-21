import express from "express";
import serverless from "serverless-http";
import type { Request, Response } from "express";

const app = express();

app.get("/api/auth/login", (request: Request, response: Response) => {
    const redirect_uri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI!);
    const url =
    `https://discord.com/api/oauth2/authorize` +
    `?client_id=${process.env.DISCORD_CLIENT_ID}` + 
    `&redirect_uri=${redirect_uri}` +
    `&response_type=code` +
    `&scope=identify%20guilds`;

    response.redirect(url);
});

app.get("api/auth/callback", async(request: Request, response: Response) => {
    const code = request.query.code as string | undefined
    if (!code) {
        return response.status(400).send("Invalid or no code provided");
    }
    
    try {
        const params = new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID!,
            client_secret: process.env.DISCORD_CLIENT_SECRET!,
            grant_type: "authorization_code",
            code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI!,
        });

        const token_response = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params,
        });

        const token_data = await token_response.json();
        if (!token_data.access_token) {
            return response.status(400).json(token_data);
        }

        const user_response = await fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${token_data.access_token}`,
            },
        });

        const user = await user_response.json();

        // need to save data via cookies
        // and store stuff in databases

        return response.json(user);
    } catch (error) {
        console.error(error);
        alert(error);
        return response.status(500).send("OAuth failed");
    }
});