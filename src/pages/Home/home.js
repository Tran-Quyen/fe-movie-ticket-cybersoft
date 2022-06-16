import React, { Component } from "react";
import { connect } from "react-redux";
import SVGLoading from "../../Components/loading";
import * as Action from "../../Store/action/index";
import Carousel from "../../Components/Home/MainPage/carousel";
import HomeTool from "../../Components/Home/Home-tool/home-tool";
import MovieAvailable from "../../Components/Home/MainPage/MovieAvailable";
import Footer from "../../Components/footer";
import SmallSpinner from "../../Components/smallSpinner";
import MobileMovieSlider from "../../Components/Home/Mobile/mobile-movieSlider";
class Home extends Component {
  componentDidMount() {
    this.props.setLoading();
    this.props.getListMovie();
  }
  scrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };
  render() {
    let { loading } = this.props;
    localStorage.removeItem("DetailId");
    localStorage.removeItem("Ticket");
    if (loading) {
      return (
        <div className="loading-spinner">
          <SVGLoading />
        </div>
      );
    }
    return (
      <>
        <div>
          <div className="carousel">
            <Carousel />
            <HomeTool movieDate={this.props.movieDate} />
          </div>
          <div className="availableMovie" id="sectionMovies">
            <h3 className="now_title">Now available</h3>
            <div className="tab-content nav-tabContent desktop" id="movie">
              <div className="desktop">
                {loading ? <SmallSpinner /> : <MovieAvailable />}
              </div>
            </div>
            <div className="tab-content nav-tabContent mobile" id="movie">
              {loading ? <SmallSpinner /> : <MobileMovieSlider />}
            </div>
          </div>
        </div>
        <Footer />
        <div className="backToTop mobile" onClick={this.scrollTop}></div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  listMovie: state.movieReducer.listMovie,
  loading: state.movieReducer.loading,
  listMovieUpcoming: state.movieReducer.listMovieUpcoming
});
const mapDispatchToProps = dispatch => {
  return {
    getListMovie: () => {
      dispatch(Action.actGetListMovieAPI());
    },
    setLoading: () => {
      dispatch(Action.actLoading());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
