var alice = {
  command: "shoti",
  type: "prefix", 
  author: "shoti-api/Lance Ajiro",
  restrict: "none", 
  cooldown: 10,
};

async function command({ alice, api, axios, bot, fs, event, cache }) {
  try {
    
    bot.setMessageReaction("⏳", event.messageID, () => {}, true); // Loading

    const request = require("request");
    let response = await axios.post("https://api--v1-shoti.vercel.app/api/v1/get", {
      apikey: "shoti-1h7073uemhk3or5ml",
    });

    var file = fs.createWriteStream(`${cache}/shoti.mp4`);
    var rqs = request(encodeURI(response.data.data.url));
    rqs.pipe(file);

    file.on("finish", () => {
      bot.setMessageReaction("🟢", event.messageID, () => {}, true); // Success
      return bot.chat(
        {
          body: `@${response.data.data.user.username}`,
          attachment: fs.createReadStream(`${cache}/shoti.mp4`),
        },
        event.threadID,
        event.messageID
      );
    });

    file.on("error", (err) => {
      bot.setMessageReaction("🔴", event.messageID, () => {}, true); // Failed
      bot.chat(`Shoti Error: ${err}`, event.threadID, event.messageID);
    });
  } catch (error) {
    bot.setMessageReaction("🔴", event.messageID, () => {}, true); // Failed
    bot.chat(`An error occurred while generating video: ${error}`, event.threadID, event.messageID);
  }
}

module["exports"] = {
  alice,
  command,
};
