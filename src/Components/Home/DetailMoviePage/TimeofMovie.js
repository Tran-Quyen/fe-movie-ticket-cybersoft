import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
export default function TimeofMovie(props) {
  const renderGioChieu = () => {
    if (props.LichChieu) {
      const LichChieuPhim = props.LichChieu;
      const GioChieuPhim = _.filter(
        LichChieuPhim,
        time =>
          new Date(time.ngayChieuGioChieu).toLocaleDateString() ===
          (props.ngayChieu !== "" && props.ngayChieu
            ? props.ngayChieu
            : props.defaultTime)
      );
      return Object.keys(GioChieuPhim).map((dateMovie, indexDateMovie) => {
        return (
          <button className="btnDayofMovie" key={indexDateMovie}>
            <Link
              key={indexDateMovie}
              className="left"
              to={`/dat-ve/${GioChieuPhim[dateMovie].maLichChieu}`}
            >
              {new Date(
                GioChieuPhim[dateMovie].ngayChieuGioChieu
              ).toLocaleTimeString()}
            </Link>
          </button>
        );
      });
    }
  };
  return <div>{renderGioChieu()}</div>;
}
