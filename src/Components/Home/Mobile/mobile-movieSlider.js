import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

class MobileMovieSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      more: false,
    };
  }
  renderHTML() {
    if (this.props.listMovie) {
      if (this.state.more === true) {
        return this.props.listMovie.slice(0, 21).map((item, index) => {
          return (
            <div className="movie_card mb-3" key={index}>
              <Link className="movie_link" to={`/detail-movie/${item.maPhim}`}>
                <div
                  className="img-wrapper"
                  style={{ backgroundImage: `url(${item.hinhAnh})` }}
                >
                  <div className="img-content row justify-content-between">
                    <div className="img-content_info">
                      <h5>{item.tenPhim}</h5>
                      <p>
                        Khởi chiếu ngày:{" "}
                        {new Date(item.ngayKhoiChieu).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="img-content_evaluate">
                      <h5>{item.danhGia}</h5>
                      <Rating
                        className="rateStar"
                        name="read-only"
                        value={parseInt(item.danhGia)}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        });
      } else {
        return this.props.listMovie.slice(0, 4).map((item, index) => {
          return (
            <div className="movie_card mb-3" key={index}>
              <Link className="movie_link" to={`/detail-movie/${item.maPhim}`}>
                <div
                  className="img-wrapper"
                  style={{ backgroundImage: `url(${item.hinhAnh})` }}
                >
                  <div className="img-content row justify-content-between">
                    <div className="img-content_info">
                      <h5>{item.tenPhim}</h5>
                      <p>
                        Khởi chiếu ngày:{" "}
                        {new Date(item.ngayKhoiChieu).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="img-content_evaluate">
                      <h5>{item.danhGia > 5 ? 5 : item.danhGia}</h5>
                      <Rating
                        className="rateStar"
                        name="read-only"
                        value={parseInt(item.danhGia)}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        });
      }
    }
  }
  render() {
    return (
      <div className="mobile">
        {this.renderHTML()}
        {this.state.more === false ? (
          <button
            className="moreBtn"
            onClick={() => {
              this.setState({
                more: true,
              });
            }}
          >
            Xem thêm
          </button>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  listMovie: state.movieReducer.listMovie,
});

export default connect(mapStateToProps, null)(MobileMovieSlider);
