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

    host: "smtp-relay.brevo.com",

    port: 587,

    secure: false,

    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }

});

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: "canwegoonarasmalaidate@gmail.com",

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