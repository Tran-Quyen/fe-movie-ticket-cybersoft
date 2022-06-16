import React, { Component } from "react";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import AnchorLink from "react-anchor-link-smooth-scroll";
class Carousel extends Component {
  render() {
    return (
      <div className="carousel-main desktop">
        <div className="carousel_detail">
          <div className="carousel-wrapper">
            <div className="carousel-content">
              <div className="carousel_contentTitle">
                <p className="first_content">Great experiences</p>
                <p className="sec_content">
                  For Customers / Cyber movies forerver
                </p>
              </div>
              <div className="carousel_contentDescription">
                <p className="content_description">
                  <FontAwesomeIcon className="quoteLeft" icon={faQuoteLeft} />
                  Cyber movies proud to be the website which have the large
                  number of movie theaters cooporate with, we could ensure to
                  bring you a best experiences with our website where you could
                  book ticket from many theaters that exist in country
                  <FontAwesomeIcon className="quoteRight" icon={faQuoteRight} />
                </p>
                <AnchorLink className="toMoviesButton" href="#sectionMovies">
                  Buy Tickets
                </AnchorLink>
              </div>
            </div>
            <div className="carousel_movieTitle">
              <img
                alt="black title"
                src="../Asset/black-removebg-preview.png"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Carousel;
