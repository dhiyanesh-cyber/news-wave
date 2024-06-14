import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import CardComponent from "./CardComponent";

const HomePage = () => {
  const [techNews, setTechNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [entertainmentNews, setEntertainmentNews] = useState([]);

  useEffect(() => {
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

  const handlePrevClick = () => {
    const gradientCards = document.querySelector(".gradient-cards");
    gradientCards.scrollBy({
      left: -gradientCards.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleNextClick = () => {
    const gradientCards = document.querySelector(".gradient-cards");
    gradientCards.scrollBy({
      left: gradientCards.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="HomeContainer">
        {/* Tech news */}
        <div className="container">
          <h2 className="TechNewsTitle">
            Latest Innovations and Updates in Tech
          </h2>
          <div className="Carousel">
            <div className="Previmg" onClick={handlePrevClick}>
              <img src="/Next1.png" alt="" />
            </div>
            <div className="gradient-cards">
              {techNews.map((item, index) => (
                <CardComponent
                  key={index}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
            <div className="Nextimg" onClick={handleNextClick}>
              <img src="/Next1.png" alt="" />
            </div>
          </div>
        </div>

        {/* Tech news */}
        <div className="container">
          <h2 className="TechNewsTitle">Top Sports News and Updates</h2>
          <div className="gradient-cards">
            {sportsNews.map((item, index) => (
              <CardComponent
                key={index}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>

        <div className="container">
          <h2 className="TechNewsTitle">The Latest Cinema News</h2>
          <div className="gradient-cards">
            {entertainmentNews.map((item, index) => (
              <CardComponent
                key={index}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
