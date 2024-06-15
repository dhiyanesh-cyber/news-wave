import NewsAPI from 'newsapi';
import express, { urlencoded } from 'express';
import cors from 'cors';
import collection from './config.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
dotenv.config();


const newsApiKey = process.env.NEWS_API;
const newsapi = new NewsAPI(newsApiKey);


const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));


const port = 3000;
const date = new Date();


//
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



//Post Request for User registration
app.post('/register', async (req, res) => {
  try {
    const data = req.body;
    const existingUser = await collection.findOne({email: data.email})

    if(existingUser){
      res.status(409).json({ message: "User with this email id already exists, please try to register using another email." });
    }else{
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds)
      data.password = hashedPassword;
      const userData = await collection.insertMany(data);
      console.log("User data: ", userData);
      res.status(201).json({ message: "User registered successfully." });
    }

    
  } catch (error) {
    console.log("Error while post req:" , error);
    res.status(500).json({ message: "An error occurred while processing the request." });

  }
})



//Post request for User Login
app.post("/login", async (req, res) => {
  //check whether user with this email exist or not.
  try {
    const check = await collection.findOne({email: req.body.email})
    if (!check) {
      res.status(409).json({ message: "User with this email id does not exists." });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (isPasswordMatch) {
      res.status(201).json({ message: "Login successfull." });
    }else{
      res.status(409).json({ message: "Wrong Password" });
    }
  } catch (error) {
    
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
