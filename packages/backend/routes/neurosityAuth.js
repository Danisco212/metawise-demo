import express from 'express'
import { Notion } from '@neurosity/notion'

const oauthRouter = express.Router()
const notion = new Notion({
    autoSelectDevice: false,
});

oauthRouter.get("/get-oauth-url", async (req, res, next) => {
    notion.createOAuthURL({
        clientId: process.env.NEUROSITY_OAUTH_CLIENT_ID,
        clientSecret: process.env.NEUROSITY_OAUTH_CLIENT_SECRET,
        redirectUri: process.env.NEUROSITY_OAUTH_CLIENT_REDIRECT_URI,
        responseType: "token", // token | code
        state: getState(),
        scope: getScopes()
    })
    .then((url) => res.json({
        tusCode: 200,
        body: { url }
    }))
    .catch((error) => res.json({
        statusCode: 400,
        body: error.response.data,
        data: {
            clientId: 'sample',
            clientSecret: process.env.NEUROSITY_OAUTH_CLIENT_SECRET,
            redirectUri: process.env.NEUROSITY_OAUTH_CLIENT_REDIRECT_URI,
        }
    }))
})

function getState() {
    return Math.random().toString().split(".")[1];
}

function getScopes() {
    return [
      "read:devices-status",
      "read:devices-info",
      "read:brainwaves",
      "read:signal-quality",
      "read:accelerometer"
      /* All other possible scopes */
      // "read:devices-settings",
      // "write:devices-settings",
      // "write:wifi-settings",
      // "write:haptics",
      // "write:brainwave-markers",
      // "write:brainwaves",
      // "read:memories:brainwaves",
      // "read:calm",
      // "read:memories:calm",
      // "read:focus",
      // "read:memories:focus",
      // "read:kinesis",
      // "write:kinesis",
    ];
  }

export default oauthRouter
