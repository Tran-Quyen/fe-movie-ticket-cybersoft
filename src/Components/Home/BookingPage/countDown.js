import React, { memo, useState, useEffect } from "react";
import Countdown from "react-countdown";
function CountDown() {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
    }, 300000);
  }, []);
  if (redirect)
    return (
      <div className="modalContent_wrapper">
        <div className="modalContent">
          <h5>
            Thời gian giữ ghế của bạn đã kết thúc, vui lòng thực hiện lại quá
            trình đặt vé
          </h5>
          <hr />
          <span
            className="btn btn-danger close-btn"
            onClick={() => {
              window.location.reload();
            }}
          >
            Đóng
          </span>
        </div>
      </div>
    );
  const Completionist = () => <span>You are good to go!</span>;
  const rendered = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    }
    return (
      <div>
        <p className="timeLabel">TIME LEFT</p>
        <h1 className="timeCount">
          {minutes}:{seconds}
        </h1>
      </div>
    );
  };
  return (
    <div className="countdown">
      <Countdown date={Date.now() + 300000} renderer={rendered} />
    </div>
  );
}
export default memo(CountDown);
