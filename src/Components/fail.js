import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

export default class Fail extends Component {
  render() {
    let { tab, fail } = this.props;
    return (
      <div className="failModal-wrapper">
        <FontAwesomeIcon className="closeIcon" onClick={fail} icon={faTimes} />
        <div className="failModal">
          <div className="icon-wrapper">
            <FontAwesomeIcon className="failIcon" icon={faTimesCircle} />
          </div>
          <div className="failContent">
            <p>{tab}</p>
          </div>
        </div>
      </div>
    );
  }
}
