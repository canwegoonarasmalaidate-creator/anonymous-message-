const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/send", async (req, res) => {

  const { message } = req.body;

  console.log("Message received:", message);

  console.log("EMAIL_USER:", process.env.EMAIL_USER);

  console.log(
    process.env.EMAIL_PASS
      ? "EMAIL_PASS exists"
      : "EMAIL_PASS missing"
  );

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Anonymous Message",
      text: message
    });

    console.log("EMAIL SENT SUCCESSFULLY");

    res.send("Message Sent!");

  } catch (error) {

    console.log("EMAIL ERROR:");
    console.log(error);

    res.send("Error Sending Message");

  }

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});