const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/send", async (req, res) => {

  const { message } = req.body;

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "process.env.EMAIL_USER",
        pass: "process.env.EMAIL_PASS"
      }
    });

    await transporter.sendMail({
      from: "process.env.EMAIL_USER",
      to: "process.env.EMAIL_USER",
      subject: "Type your confession here anonymously",
      text: message
    });

    res.send("Message Sent!");

  } catch (error) {

    console.log(error);

    res.send("Error Sending Message");

  }

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});