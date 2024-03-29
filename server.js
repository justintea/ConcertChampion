//* require block
require("dotenv").config();
require("./config/database");

const express = require("express");
const path = require("path");
const logger = require("morgan");

//* router requires
const usersRouter = require("./routes/usersRouter")
const ordersRouter = require("./routes/ordersRouter")
const addressesRouter = require("./routes/addressesRouter")


//* openai import
const OpenAI = require('openai');

//* middleware block
const app = express();
app.use(logger("dev"));
app.use(express.json());
//* Middleware to verify token and assign user object of payload to req.user.
app.use(require('./config/checkToken'));

app.use(express.static(path.join(__dirname, "dist")));
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/addresses", addressesRouter);

//* gpt middleware
// const openai = new OpenAI();

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_API_KEY
  // apiKey: ''
  // apiKey: ''

});

//? new code from gpt 
app.post("/api/sendData", async (req, res) => {
  try {
    const { favArtist, favSong, performanceLocation } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        'role': 'user',
        'content': `I am going to a concert, and being a super passionate fan of ${favArtist}, I would like to have an information guide on my concert experience - all the things I should know, have, prepared in advance, in order to enjoy. 
        5 Specific topics I would like to know:
        1. Basic information about ${favArtist}, and recent updates or gossip or tensions with media or recording firms. 
        2. Top 3 most-played songs and top selling (by total sales) album of ${favArtist}.
        3. When going to ${favArtist}'s concerts, what should I know about? eg. practices from other fans, dressing, exchange of items (what specifically? eg. bracelets), any name the fans are called by, estimated number of fans of ${favArtist} worldwide. Share what is specific to ${favArtist}'s concerts, and avoid sharing general concert etiquette. 
        4. Interesting facts or details to my favourite song, ${favSong}, who is it for or about, why it was written (elaborate on this more), etc.
        5. Fun facts about ${favArtist}, facts that most people don't know, eg. does ${favArtist} have any history or past performance at ${performanceLocation} (If the artist has performed at ${performanceLocation} before, indicate the most recent year and month the artist did), recent dating history, does the artist act or engage in other entertainment activites, etc. 
        As you generate the guide, so summarize the 5 headers, especially number 4.
        `
      }],
      max_tokens: 1200
    });

    console.log(response);
    console.log(response.choices[0].message);

    // Send the GPT-3 response back to the frontend or handle it as needed

    res.status(200).json({
      success: true,
      message: "Data sent successfully",
      responseData: response.choices[0].message, // Include the GPT-3 response content
    });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


//* routes block
app.get("/api/", (req, res) => {
  res.json({ message: "welcome to the backend" });
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


//* listen block
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
