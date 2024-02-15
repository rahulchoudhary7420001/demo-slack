const { App } = require("@slack/bolt");
const dotenv = require("dotenv");
const axios = require("axios");
const express = require("express");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(5000, () => {
  console.log(`server is running....`);
});

const boltApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

const postMessage = async (slackPostURL, pretext, title, text) => {
  try {
    try {
      const response = await axios.post(
        slackPostURL,
        {
          text: pretext,
          attachments: [
            {
              color: "36a64f",
              blocks: [
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: `${title}\n${text}`,
                  },
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = parseInt(error.response.headers["retry-after"], 10);
        console.log(
          `Rate limit reached. Retrying after ${retryAfter} seconds.`
        );
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        return postMessage(token, pretext, title, text);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

boltApp.message(async ({ message, say }) => {
  try {
    console.log("called..........");
    if (message.channel === "C05NKA5D80K") {
      console.log("called..........2");
      if (message.bot_profile && message.bot_profile.name === "Front") {
        if (
          message.attachments &&
          message.attachments[0] &&
          message.attachments[0].text
        ) {
          let zerotext = message.attachments[0].text.toLowerCase();
          zerotext.replace(/\s/g, "");
          if (
            zerotext.includes("steam-south") ||
            zerotext.includes("barracudanetworks") ||
            zerotext.includes("prospectsdirectory.org") ||
            zerotext.includes("updateyournotificationpreference") ||
            zerotext.includes("linkedinnotificationemail") ||
            zerotext.includes("messagenotdelivered") ||
            zerotext.includes("deliveryincomplete") ||
            zerotext.includes("contactoutcredits") ||
            zerotext.includes("phishingattack") ||
            zerotext.includes("couldn'tbedelivered") ||
            zerotext.includes("sendmailtopostmaster") ||
            zerotext.includes("couldn'tbedelivered") ||
            zerotext.includes("smartlead") ||
            zerotext.includes("googleaccount") ||
            zerotext.includes("yourdigestemail") ||
            zerotext.includes("deliveryhasfailed") ||
            zerotext.includes("docsendteam")
          ) {
            return;
          }
        }
        const processedText = `${message.attachments[0].pretext}
    ${message.attachments[0].title}
    ${message.attachments[0].text}`;
        console.log(processedText);
        let slackPostURL;
        const pretext = message.attachments[0].pretext;
        switch (true) {
          case pretext.includes("[AlphaAI]"):
            slackPostURL =
              "https://hooks.slack.com/services/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";
          case pretext.includes("[Keenee]"):
            slackPostURL =
              "https://hooks.slack.com/services/TS0R931B7/B05PRBENJDT/nPwTBcRhZAxo5Ulxsk9KtJ0";
            break;
          case pretext.includes("[Welspot]"):
            slackPostURL =
              "https://hooks.slack.com/services/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";
            break;
          case pretext.includes("[AllAthlete]"):
            slackPostURL =
              "https://hooks.slack.com/services/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";
            break;
          case pretext.includes("[Harmony Homes]"):
            slackPostURL =
              "https://hooks.slack.com/services/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";
            break;
          case pretext.includes("rst-100"):
            slackPostURL =
              "https://hooks.slack.com/services/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";
            break;
          default:
            slackPostURL =
              "https://hooks.slack.com/services/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";
            break;
        }
        await postMessage(
          slackPostURL,
          message.attachments[0].pretext,
          message.attachments[0].title,
          message.attachments[0].text
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
});

(async () => {
  await boltApp.start(process.env.PORT || 3000);
  console.log(":zap:️ Bolt app is running!");
})();
