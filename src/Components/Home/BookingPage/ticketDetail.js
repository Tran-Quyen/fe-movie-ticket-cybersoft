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
              <p>Chi ti???t v?? ???? ?????t</p>
            </div>
            <div className="ticket-detail">
              <div className="ticket-detail_title">
                <p>T??n phim:</p>
                <p>T??n c???m r???p:</p>
                <p>T??n r???p:</p>
                <p>Gh??? ???? ?????t:</p>
              </div>
              <div className="ticket-detail_content">
                <p>{Ticket.tenPhim}</p>
                <p>{Ticket.tenCumRap}</p>
                <p>{Ticket.tenRap}</p>
                <div>{this.renderSeatName()}</div>
              </div>
            </div>
            <div className="ticket-footer">
              <p>H??nh th???c thanh to??n: {Ticket.payStyle}</p>
              <p>T???ng thanh to??n: {Ticket.tienVe}</p>
              <Link to="/">Tr??? l???i trang ch???</Link>
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
                Xem chi ti???t v??{" "}
                <FontAwesomeIcon className="angle" icon={faAngleDown} />
              </AnchorLink>
            ) : (
              <AnchorLink className="detail-link" href="#ticket">
                R??t g???n chi ti???t{" "}
                <FontAwesomeIcon className="angle" icon={faAngleUp} />
              </AnchorLink>
            )}
          </div>
          <div className="seat-pos_wrapper" id="seat">
            <div className={this.state.detail ? "seat-pos detail" : "seat-pos"}>
              <h3>V??? tr?? gh??? ???? ?????t</h3>
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
