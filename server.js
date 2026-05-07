const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/send", async (req, res) => {

    const { message } = req.body;

    console.log("MESSAGE:", message);

    try {

        const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    requireTLS: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },

    family: 4

});

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: "Anonymous Message",

            text: message

        });

        console.log("EMAIL SENT");

        res.send("Message Sent!");

    }

    catch (error) {

        console.log("FULL ERROR:");
        console.log(error);

        res.send("Error Sending Message");

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});