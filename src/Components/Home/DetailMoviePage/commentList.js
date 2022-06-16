import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../../Store/action";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maPhim: "",
      hoTen: "",
      nhanXet: "",
      danhGia: "",
      value: 5,
      smallValue: 5,
      change: false,
      commentList: [],
    };
  }
  componentDidMount() {
    const id = this.props.id;
    this.props.actGetCommentList(id);
    const danhGia = this.props.danhGia;
    this.setState({
      maPhim: id,
      value: danhGia,
    });
  }

  componentDidUpdate() {
    const id = this.props.id;
    this.props.actGetCommentList(id);
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleComment = (e) => {
    const home = JSON.parse(localStorage.getItem("UserHome"));
    e.preventDefault();
    if (home && this.state.nhanXet !== "") {
      this.setState(
        {
          hoTen: home.hoTen,
          maPhim: this.state.maPhim,
          nhanXet: this.state.nhanXet,
          danhGia: this.state.value,
        },
        () => {
          this.props.actComment(this.state, this.state.maPhim);
          this.setState({
            nhanXet: "",
          });
        }
      );
    } else {
      window.location.href = "/login";
    }
  };
  handleDelete = (e) => {
    const commentId = e.target.getAttribute("value");
    const id = this.props.id;
    this.props.actxoaComment(id, commentId);
  };
  handleChangeComment = (e) => {
    const id = this.props.id;
    const commentId = e.target.getAttribute("value");
    const home = JSON.parse(localStorage.getItem("UserHome"));
    if (home && this.state.nhanXet && this.state.smallValue) {
      this.setState(
        {
          hoTen: home.hoTen,
          nhanXet: this.state.nhanXet,
          danhGia: this.state.smallValue,
          change: false,
        },
        () => {
          this.props.actSuaComment(id, commentId, this.state);
          this.setState({
            nhanXet: "",
          });
        }
      );
    }
  };
  renderAction = (e) => {
    e.target.classList.toggle("show");
  };
  renderCommentList = () => {
    const home = JSON.parse(localStorage.getItem("UserHome"));
    if (this.props.comment.danhSachComment) {
      if (this.props.comment.danhSachComment.length !== 0) {
        return this.props.comment.danhSachComment
          .sort((a, b) => {
            return b.id - a.id;
          })
          .map((item, index) => {
            return (
              <div key={index} className="commentList">
                <div className="headerComment">
                  <div className="guest_intro">
                    <img
                      alt="avatar"
                      className="guest_ava mr-2"
                      src="../Asset/user_ava.png"
                    />
                    <h5>{item.hoTen}</h5>
                  </div>
                  {this.state.change === false ? (
                    <Rating
                      name="read-only"
                      value={parseInt(item.danhGia)}
                      readOnly
                    />
                  ) : item.hoTen === home.hoTen ? (
                    <Rating
                      name="danhGia1"
                      value={this.state.smallValue}
                      onChange={(event, newValueSmall) => {
                        this.setState({
                          smallValue: newValueSmall,
                        });
                      }}
                    />
                  ) : (
                    <Rating
                      name="read-only"
                      value={parseInt(item.danhGia)}
                      readOnly
                    />
                  )}
                </div>
                <hr />
                <div className="contentComment">
                  {this.state.change === false ? (
                    <p>{item.nhanXet}</p>
                  ) : item.hoTen === home.hoTen ? (
                    <div className="changeCommentDetail">
                      <input
                        type="text"
                        className="changeComment"
                        name="nhanXet"
                        value={this.state.nhanXet}
                        placeholder="Nhập bình luận"
                        onChange={this.handleChange}
                      />
                      <div className="changeButton">
                        <button
                          className="commentUpdate"
                          onClick={this.handleChangeComment}
                          value={item.id}
                        >
                          Đăng
                        </button>
                        <button
                          className="cancelUpdate"
                          onClick={() => {
                            this.setState({
                              change: false,
                            });
                          }}
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{item.nhanXet}</p>
                  )}
                </div>
                {home ? (
                  home.hoTen === item.hoTen && this.state.change === false ? (
                    <div className="actionComment" onClick={this.renderAction}>
                      <div className="actionCommentIcon">
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </div>
                      <div className="actionCommentDetail">
                        <p
                          onClick={() => {
                            this.setState({
                              change: true,
                              nhanXet: item.nhanXet,
                            });
                          }}
                        >
                          Sửa
                        </p>
                        <p value={item.id} onClick={this.handleDelete}>
                          Xóa
                        </p>
                      </div>
                    </div>
                  ) : null
                ) : null}
              </div>
            );
          });
      } else {
        return (
          <div className="lackComment">
            <p>Phim này hiện chưa có comment</p>
          </div>
        );
      }
    }
  };
  render() {
    return (
      <div className="container">
        <div className="upComment">
          <h1>{this.state.value > 5 ? 5 : this.state.value}</h1>
          <Box
            className="ratingComment"
            component="fieldset"
            mb={3}
            borderColor="transparent"
          >
            <Rating
              name="danhGia"
              className="rateArea"
              value={this.state.value}
              onChange={(event, newValue) => {
                this.setState({
                  value: newValue,
                });
              }}
            />
          </Box>
          <form className="commentForm" onSubmit={this.handleComment}>
            <input
              name="nhanXet"
              type="text"
              className="commentArea"
              placeholder="Hãy cho mọi người biết suy nghĩ của bạn về bộ phim"
              value={this.state.nhanXet}
              onChange={this.handleChange}
            ></input>
            <div className="modaSwitchlLogin">
              <button className="commentBtn">Đăng</button>
            </div>
          </form>
        </div>
        {this.renderCommentList()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  comment: state.movieReducer.comment,
});
const mapDispatchToProps = (dispatch) => {
  return {
    actGetCommentList: (id) => {
      dispatch(action.actLayNhanXet(id));
    },
    actComment: (comment, id) => {
      dispatch(action.actNhanXet(comment, id));
    },
    actxoaComment: (maPhim, maComment) => {
      dispatch(action.actxoaComment(maPhim, maComment));
    },
    actSuaComment: (maPhim, maComment, comment) => {
      dispatch(action.actSuaComment(maPhim, maComment, comment));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
