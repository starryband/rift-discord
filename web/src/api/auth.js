"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.get("/api/auth/login", function (req, res) {
    var redirect_uri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI);
    var url = "https://discord.com/api/oauth2/authorize" +
        "?client_id=".concat(process.env.DISCORD_CLIENT_ID) +
        "&redirect_uri=https://rift-discord.vercel.app/api/auth/callback" +
        "&response_type=code" +
        "&scope=identify%20guilds";
    res.redirect(url);
});
app.get("/api/auth/callback", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var code, params, token_response, token_data, user_response, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = request.query.code;
                if (!code) {
                    return [2 /*return*/, response.status(400).send("Invalid or no code provided")];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                params = new URLSearchParams({
                    client_id: process.env.DISCORD_CLIENT_ID,
                    client_secret: process.env.DISCORD_CLIENT_SECRET,
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: process.env.DISCORD_REDIRECT_URI,
                });
                return [4 /*yield*/, fetch("https://discord.com/api/oauth2/token", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: params,
                    })];
            case 2:
                token_response = _a.sent();
                return [4 /*yield*/, token_response.json()];
            case 3:
                token_data = _a.sent();
                if (!token_data.access_token) {
                    return [2 /*return*/, response.status(400).json(token_data)];
                }
                return [4 /*yield*/, fetch("https://discord.com/api/users/@me", {
                        headers: {
                            Authorization: "Bearer ".concat(token_data.access_token),
                        },
                    })];
            case 4:
                user_response = _a.sent();
                return [4 /*yield*/, user_response.json()];
            case 5:
                user = _a.sent();
                // need to save data via cookies
                // and store stuff in databases
                return [2 /*return*/, response.json(user)];
            case 6:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, response.status(500).send("OAuth failed")];
            case 7: return [2 /*return*/];
        }
    });
}); });
