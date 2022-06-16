import React, { Component } from "react";
import { connect } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Date } from "prismic-reactjs";
import Rating from "../../RatingMovie";
import * as Moment from "moment";
import { Link } from "react-router-dom";
import Swiper from "swiper";
class MovieAvailable extends Component {
  componentDidMount() {
    new Swiper(".swiper-container", {
      effect: "coverflow",
      loop: true,
      centeredSlides: true,
      slidesPerView: "auto",
      grabCursor: true,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  renderHTML = () => {
    let { listMovie } = this.props;
    return listMovie.slice(0, 21).map((movie, index) => {
      const date = Date(movie.ngayKhoiChieu);
      const formattedDate = Moment(date).format("LL");
      return (
        <div key={index} className="swiper-slide">
          <Link className="imgBx" to={`/detail-movie/${movie.maPhim}`}>
            <img
              className="container-fluid"
              alt="MovieAvailable"
              src={movie.hinhAnh}
              onError={(e) => {
                e.target.src =
                  "https://miro.medium.com/max/978/1*pUEZd8z__1p-7ICIO1NZFA.png";
              }}
            />
          </Link>
          <div className="movie-detail">
            <Link to={`/detail-movie/${movie.maPhim}`}>{movie.tenPhim}</Link>
            <p>Premiere Date: {formattedDate}</p>
            <Rating danhGia={movie.danhGia} />
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <div className="swiper-container container">
          <div className="swiper-wrapper">{this.renderHTML()}</div>
          <div className="swiper-pagination" />
          <div className="swiper-button-next" />
          <div className="swiper-button-prev" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listMovie: state.movieReducer.listMovie,
});

export default connect(mapStateToProps, null)(MovieAvailable);
