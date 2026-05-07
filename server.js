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
        user: "canwegoonarasmalaidate@gmail.com",
        pass: "dcwa vvor dvty tkfs"
      }
    });

    await transporter.sendMail({
      from: "canwegoonarasmalaidate@gmail.com",
      to: "canwegoonarasmalaidate@gmail.com",
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