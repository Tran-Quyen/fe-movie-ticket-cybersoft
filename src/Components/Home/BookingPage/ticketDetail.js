import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
export default class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenGhe: "",
      detail: false,
    };
  }
  setChair = (e) => {
    let tenGhe = e.target.getAttribute("tenghe");
    this.setState({
      tenGhe,
      detail: true,
    });
  };
  renderSeatName = () => {
    const Ticket = JSON.parse(localStorage.getItem("Ticket"));
    return Ticket.danhSachVe
      .sort((a, b) => {
        return a.tenGhe - b.tenGhe;
      })
      .map((item, index) => {
        if (this.state.detail) {
          return (
            <a
              className="tenGhe"
              key={index}
              onClick={this.setChair}
              tenghe={item.tenGhe}
            >
              {item.tenGhe}{" "}
            </a>
          );
        } else {
          return (
            <AnchorLink
              className="tenGhe"
              href="#seat"
              key={index}
              onClick={this.setChair}
              tenghe={item.tenGhe}
            >
              {item.tenGhe}{" "}
            </AnchorLink>
          );
        }
      });
  };
  renderSeat = () => {
    let Ticket = JSON.parse(localStorage.getItem("Ticket"));
    return Ticket.phongVe.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <div className="chair">
            <p>{this.state.tenGhe == item.tenGhe ? item.tenGhe : ""}</p>
          </div>
          {(index + 1) % 16 === 0 ? (
            <div style={{ width: "100%" }}></div>
          ) : null}
        </React.Fragment>
      );
    });
  };
  render() {
    const Ticket = JSON.parse(localStorage.getItem("Ticket"));
    if (Ticket) {
      return (
        <div className="ticket-container">
          <div className="ticket-wrapper" id="ticket">
            <div className="ticket-title">
              <p>Chi tiết vé đã đặt</p>
            </div>
            <div className="ticket-detail">
              <div className="ticket-detail_title">
                <p>Tên phim:</p>
                <p>Tên cụm rạp:</p>
                <p>Tên rạp:</p>
                <p>Ghế đã đặt:</p>
              </div>
              <div className="ticket-detail_content">
                <p>{Ticket.tenPhim}</p>
                <p>{Ticket.tenCumRap}</p>
                <p>{Ticket.tenRap}</p>
                <div>{this.renderSeatName()}</div>
              </div>
            </div>
            <div className="ticket-footer">
              <p>Hình thức thanh toán: {Ticket.payStyle}</p>
              <p>Tổng thanh toán: {Ticket.tienVe}</p>
              <Link to="/">Trở lại trang chủ</Link>
            </div>
          </div>
          <div
            className="show-detail"
            onClick={() => {
              this.state.detail === false
                ? this.setState({ detail: true })
                : this.setState({ detail: false });
            }}
          >
            {this.state.detail === false ? (
              <AnchorLink className="detail-link" href="#seat">
                Xem chi tiết vé{" "}
                <FontAwesomeIcon className="angle" icon={faAngleDown} />
              </AnchorLink>
            ) : (
              <AnchorLink className="detail-link" href="#ticket">
                Rút gọn chi tiết{" "}
                <FontAwesomeIcon className="angle" icon={faAngleUp} />
              </AnchorLink>
            )}
          </div>
          <div className="seat-pos_wrapper" id="seat">
            <div className={this.state.detail ? "seat-pos detail" : "seat-pos"}>
              <h3>Vị trí ghế đã đặt</h3>
              <div className="monitor">
                <span>SCREEN</span>
              </div>
              <div className="chairList">{this.renderSeat()}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
