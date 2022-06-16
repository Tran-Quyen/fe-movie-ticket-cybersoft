import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default class Success extends Component {
  render() {
    return (
      <div className="successModal-wrapper">
        <div className="successModal">
          <div className="icon-wrapper">
            <FontAwesomeIcon className="successIcon" icon={faCheckCircle} />
          </div>
          <div className="successContent">
            <p>{this.props.tab} thành công</p>
          </div>
        </div>
      </div>
    );
  }
}
