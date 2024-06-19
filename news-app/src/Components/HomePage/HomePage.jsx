import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./HomePage.css";
import CardComponent from "./CardComponent";
import { AuthContext } from "../../AuthProvider";

const HomePage = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [techNews, setTechNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [entertainmentNews, setEntertainmentNews] = useState([]);

  useEffect(() => {
    console.log(isLoggedIn);
    axios
      .get("http://localhost:3000/topTechHeadlines/technology/us")
      .then((res) => {
        setTechNews(res.data);
        console.log("Data: ", res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    axios
      .get("http://localhost:3000/topTechHeadlines/sports/in")
      .then((res) => {
        setSportsNews(res.data);
        console.log("Data: ", res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    axios
      .get("http://localhost:3000/topTechHeadlines/entertainment/in")
      .then((res) => {
        setEntertainmentNews(res.data);
        console.log("Data: ", res.data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  const handlePrevClick = (category) => {
    const gradientCards = document.querySelector(`.gradient-cards-${category}`);
    gradientCards.scrollBy({
      left: -gradientCards.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleNextClick = (category) => {
    const gradientCards = document.querySelector(`.gradient-cards-${category}`);
    gradientCards.scrollBy({
      left: gradientCards.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="HomeContainer">
        <div className="userWelcomeDiv">{user.name ?  <h2 className="TechNewsTitle">Hi, {user.name}</h2> : <></>}</div>

        <div className="newsCarouselsDiv">
          {/* Tech news */}
          <div className="container">
            <h2 className="TechNewsTitle">
              Latest Innovations and Updates in Tech
            </h2>
            <div className="Carousel">
              <div
                className="Previmg"
                onClick={() => {
                  handlePrevClick("tech");
                }}
              >
                <img src="/arrowhead.png" alt="" />
              </div>
              <div className="gradient-cards gradient-cards-tech">
                {techNews.map((item, index) => (
                  <CardComponent
                    key={index}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
              <div
                className="Nextimg"
                onClick={() => {
                  handleNextClick("tech");
                }}
              >
                <img src="/arrowhead.png" alt="" />
              </div>
            </div>
          </div>
          {/* Sports news */}
          <div className="container">
            <h2 className="TechNewsTitle">Top Sports News and Updates</h2>
            <div className="Carousel">
              <div
                className="Previmg"
                onClick={() => {
                  handlePrevClick("sports");
                }}
              >
                <img src="/arrowhead.png" alt="" />
              </div>
              <div className="gradient-cards gradient-cards-sports">
                {sportsNews.map((item, index) => (
                  <CardComponent
                    key={index}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
              <div
                className="Nextimg"
                onClick={() => {
                  handleNextClick("sports");
                }}
              >
                <img src="/arrowhead.png" alt="" />
              </div>
            </div>
          </div>
          {/* Cinema news */}
          <div className="container">
            <h2 className="TechNewsTitle">The Latest Cinema News</h2>
            <div className="Carousel">
              <div
                className="Previmg"
                onClick={() => {
                  handlePrevClick("cinema");
                }}
              >
                <img src="/arrowhead.png" alt="" />
              </div>
              <div className="gradient-cards gradient-cards-cinema">
                {entertainmentNews.map((item, index) => (
                  <CardComponent
                    key={index}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
              <div
                className="Nextimg"
                onClick={() => {
                  handleNextClick("cinema");
                }}
              >
                <img src="/arrowhead.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
