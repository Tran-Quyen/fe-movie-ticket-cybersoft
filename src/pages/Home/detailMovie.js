import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "./../../Store/action/index.js";
import SVGLoading from "../../Components/loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import ModalVideo from "react-modal-video";
import FullWidthTabs from "../../Components/Home/DetailMoviePage/FullWidthTabs";
import AnchorLink from "react-anchor-link-smooth-scroll";
import CommentList from "../../Components/Home/DetailMoviePage/commentList";

const DetailMovieDescription = (props) => (
  <div className="table detail-description">
    <div className="title_wrapper">
      <p className="title-description">
        <strong>Tên phim: {props.movie.tenPhim}</strong>
      </p>
      <p className="title-description">
        <strong>
          Ngày chiếu: {new Date(props.movie.ngayKhoiChieu).toLocaleDateString()}
        </strong>
      </p>
      <AnchorLink className="scrollToBooking" href="#detail">
        Mua vé
      </AnchorLink>
    </div>
    <div className="rating_wrapper">
      <div className="wrapper_circle">
        <p>Đánh giá</p>
        <h4>{props.movie.danhGia > 5 ? 5 : props.movie.danhGia}/5</h4>
        <FontAwesomeIcon className="starIcon" icon={faStar} />
      </div>
      <p className="count-rating-people">
        {props.comment.danhSachComment
          ? props.comment.danhSachComment.length
          : ""}{" "}
        người đánh giá
      </p>
    </div>
  </div>
);
class DetailMovie extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      videoid: "",
      bookTicket: false,
    };
    this.openModal = this.openModal.bind(this);
  }
  openModal() {
    this.setState({
      isOpen: true,
      videoid: this.props.movie.trailer.slice(30),
    });
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.setLoading();
    this.props.actGetCommentList(id);
    this.props.getdetailMovie(id);
    if (id !== "") {
      this.props.getMovieDateTime(id);
    }
  }
  render() {
    let { loading, movie, movieDate } = this.props;
    const userhome = JSON.parse(localStorage.getItem("UserHome"));
    const id = this.props.match.params.id;
    if (loading) {
      return (
        <div className="loading-spinner">
          <SVGLoading />
        </div>
      );
    }
    if (!userhome) {
      localStorage.setItem("DetailId", JSON.stringify(id));
    } else {
      localStorage.removeItem("DetailId");
    }
    return (
      <div className="container-fluid detail-movie">
        <ModalVideo
          channel="youtube"
          videoId={this.state.videoid}
          onClose={() => this.setState({ isOpen: false })}
          isOpen={this.state.isOpen}
        />
        <div className="detail-movie-intro">
          <LazyLoadImage
            className="detail-movie-intro-image"
            src={movie.hinhAnh}
            effect="blur"
            alt="Card"
            height={100}
            width={300}
          />
        </div>
        <div className="row tabInfo">
          <div className="col-sm-3 img-movie ">
            <LazyLoadImage
              src={movie.hinhAnh}
              effect="blur"
              alt="Card"
              height={450}
              width={300}
              className="trailer"
            />
            <div className="bg-trailer"></div>
            <div className="play-btn" onClick={this.openModal}>
              <FontAwesomeIcon icon={faPlay} />
            </div>
          </div>
          <div className="col-sm-8">
            <DetailMovieDescription
              dateTimeMovie={movieDate}
              comment={this.props.comment}
              movie={movie}
            ></DetailMovieDescription>
          </div>
        </div>
        <div className="row tabs">
          <FullWidthTabs
            movie={movie}
            ticket={this.state.bookTicket}
            id={this.props.match.params.id}
          />
        </div>
        <div className="comment-mobile">
          <CommentList
            id={this.props.match.params.id}
            danhGia={movie.danhGia}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  movie: state.movieReducer.movie,
  loading: state.movieReducer.loading,
  movieDate: state.movieReducer.movieDate,
  comment: state.movieReducer.comment,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getdetailMovie: (id) => {
      dispatch(Action.actGetDetailMovieAPI(id));
    },
    setLoading: () => {
      dispatch(Action.actLoading());
    },
    getMovieDateTime: (ve) => {
      dispatch(Action.actGetDateTimeMovie(ve));
    },
    actGetCommentList: (id) => {
      dispatch(Action.actLayNhanXet(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
