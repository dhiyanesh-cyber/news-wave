import NewsAPI from 'newsapi';
import express, { urlencoded } from 'express';
import cors from 'cors';
import crypto from 'crypto';
import collection from './models/config.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { Token } from './models/token.js';
import sendEmail from './sendEmail.js'
dotenv.config();


const newsApiKey = process.env.NEWS_API;
const newsapi = new NewsAPI(newsApiKey);
const EMAIL_SECRET = "9c1a224103f8ebe30c4594b176c9c5de98b750c0536feb924151c0199bde8a35";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




const port = 3000;
const date = new Date();



let today = date;
let yesterday = new Date(date);
yesterday.setDate(yesterday.getDate() - 7);


app.use(cors())

function filterArticleWithoutDes(article) {
  if (article.description != null && article.title != "[Removed]" && article.description != "[Removed]") {
    return article;
  }
}





app.get('/topTechHeadlines/:category/:country', (req, res) => {
  try {
    const category = req.params.category;
    const country = req.params.country;
    newsapi.v2.topHeadlines({
      category: category,
      from: yesterday.toISOString().split('T')[0],
      to: today.toISOString().split('T')[0],
      language: 'en',
      country: country
    }).then(response => {
      const filteredArticle = response.articles.filter(filterArticleWithoutDes)
      res.send(filteredArticle);
    })
      .catch(error => {
        console.log("error : ", error);
      });
  } catch (error) {
    console.log("error : ", error);
  }
});


async function emailVerification(userData) {

  const token = await new Token({
    userId: userData._id,
    token: crypto.randomBytes(32).toString("hex")
  }).save();
  console.log("Token : ", token);

  const url = `http://localhost:3000/users/${userData._id}/verify/${token.token}`
  await sendEmail(userData.email, "Verify Email", url)
}


app.post('/resendEmailVerification', async (req, res) => {

  try {
    const data = req.body;
    const userData = await collection.findOne({ email: data.email });

    console.log("Fetched user data : ", userData );

    await emailVerification(userData);

    res.status(201).json({ mesasge: "Verification mail sent to user email." })
  } catch (error) {
    console.log("Resend err: ",error);
    res.status(500).json({ message: "An error occurred while processing the request." });
  }
})



//Post Request for User registration
app.post('/register', async (req, res) => {
  try {

    const data = req.body;
    const existingUser = await collection.findOne({ email: data.email })

    if (existingUser) {
      res.status(409).json({ message: "User with this email id already exists, please try to register using another email." });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds)
      data.password = hashedPassword;
      console.log("Registered data", data);
      const [userData] = await collection.insertMany([data]);
      console.log("User data: ", userData);
      await emailVerification(userData);
      console.log("User data: ", userData.name);
      res.status(201).json({ message: "Verification mail sent to user email." });
    }


  } catch (error) {
    console.log("Error while post req:", error);
    res.status(500).json({ message: "An error occurred while processing the request." });

  }
})



//Post request for User Login
app.post("/login", async (req, res) => {
  //check whether user with this email exist or not.
  try {
    const check = await collection.findOne({ email: req.body.email })
    if (!check) {
      res.status(409).json({ message: "User with this email id does not exists." });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    const verified = check.verified;

    if (isPasswordMatch) {
      if (verified) {
        res.status(201).json({ message: "Login successfull." });
      } else {
        res.status(509).json({ message: "User email id is not verified" })
      }

    } else {
      res.status(409).json({ message: "Wrong Password" });
    }
  } catch (error) {

  }
})


app.get('/getUser/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const fetchedUserData = await collection.findOne({ email: email });
    const userData = { name: fetchedUserData.name, email: fetchedUserData.email }
    res.send({ userData })
  } catch (error) {
    console.log(error);
  }
})


app.get('/users/:id/verify/:token', async (req, res) => {
  const htmlContent = `
    <div>
      <button id="verifyButton">Click to verify email</button>
      <script>
        document.getElementById('verifyButton').addEventListener('click', async () => {
          try {
            const user = await fetch('/users/${req.params.id}/verify/${req.params.token}', {
              method: 'POST',
            }).then(res => res.json());
            alert(user.message);
          } catch (error) {
            alert(error.message);
          }
        });
      </script>
    </div>
  `;
  res.status(200).send(htmlContent);
});

app.post('/users/:id/verify/:token', async (req, res) => {
  try {
    const user = await collection.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    });

    if (!token) return res.status(400).send({ message: "Invalid link" });

    const filter = { _id: user._id };
    const updatedDoc = {
      $set: { verified: true }
    };
    await collection.updateOne(filter, updatedDoc);

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(400).send({ message: `Internal server error : ${error}` });
  }
});







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
