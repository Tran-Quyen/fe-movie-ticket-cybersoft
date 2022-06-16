import * as action from "../../../Store/action";
import { connect } from "react-redux";
import React, { Component } from "react";
import moment from "moment";
import _ from 'lodash';
import { TimePicker } from 'antd';
class ModalAddMovie extends Component {
  _edited = false;
  constructor(props) {
    super(props);
    this.state = {
      maPhim: "",
      ngayChieuGioChieu: "",
      maRap:0,
      giaVe:0,
      cumRap:"",
      defaultTheater:"BHDStar",
      noiChieu:"",
      gioChieu:""
    };
  }
  componentDidMount(){
    this.props.getTheaterInfo()
  }
  handleClose = e => {
    this.props.getMovieList()
  };
  handleChangeEdit = e => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
handleChangeCumRap= async e=>{
  this.setState({
    cumRap:e.target.value
  })
  e.target.value!=="" ?this.props.getTheaterInfoSchedule(e.target.value):this.props.getTheaterInfoSchedule(this.state.defaultTheater)
}
handleLocationTheater = async e=>{
  this.setState({
    noiChieu:e.target.value
  })
}
timeChange= (time, timeString)=>{
  this.setState({
    gioChieu: timeString
  })
}

  handleSubmitEdit = async e => {
    e.preventDefault();
    let gioChieu = this.state.gioChieu
    let ngayChieu = moment.utc(this.state.ngayChieuGioChieu).format("DD/MM/YYYY")
    let ngayChieuGioChieu = `${ngayChieu} ${gioChieu}`
    let lichChieu = {...this.state,ngayChieuGioChieu}
    this.props.addSchedule(lichChieu)
  };
  renderDanhSachCumRap = () => {
    return this.props.theaterInfo.map((theater, index) => {
      return (
        <option key={index} value={theater.maHeThongRap}>
          {theater.tenHeThongRap}
        </option>
      );
    });
  };
  renderDanhSachRap = () => {
    return this.props.theaterSchedule.map((theater, index) => {
      return (
        <option key={index} value={theater.maCumRap}>
          {theater.tenCumRap}
        </option>
      );
    });
  };
  renderMaRap=()=>{
     let test1= _.filter(this.props.theaterSchedule, {maCumRap:this.state.noiChieu});
    return Object.keys(test1).map((value,index)=>{
      let danhSachRap = test1[value].danhSachRap
      return danhSachRap.map((theater,index2)=>{
        return(
          <option key={index2} value={theater.maRap}>{theater.tenRap}</option>
        )

      })
    }
    )
  }
 render() {
  let detailMovie= this.state
    return (
      <div id="ModalTaoLichChieu" className="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content editMovie">
            <div className="modal-body">
              <form
                onSubmit={this.handleSubmitEdit}
                encType="multipart/form-data"
                action="/upload/image"
              >
                <div className="form-group">
                  <label>Tên Phim:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="maPhim"
                    onChange={this.handleChangeEdit}
                    placeholder="Nhập Mã Phim"
                  />
                </div>
                <div className="form-group">
                  <label>Ngày Khởi Chiếu:</label>
                  <input
                    type="date"
                    className="datePicker"
                    onChange={this.handleChangeEdit}
                    value={moment.utc(detailMovie.ngayChieuGioChieu).format("YYYY-MM-DD")|| ""}
                    name="ngayChieuGioChieu"
             
                  />
                </div>
                <div className="form-group">
                  <label>Giờ Khởi Chiếu:</label>
                  <div>
                  <TimePicker onChange={this.timeChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
                  </div>
                </div>
                <div className="form-group">
                  <label>Cụm Rạp:</label>
                  <select
                      className="form-control selectChoice"
                      onChange={this.handleChangeCumRap}
                      name ="cumRap"
                    >
                      <option>Cụm Rạp</option>
                      {this.renderDanhSachCumRap()}
                    </select>
                </div>
                <div className="form-group">
                  <label>Nơi Chiếu:</label>
                  <select
                      className="form-control selectChoice"
                      onChange={this.handleLocationTheater}
                      name ="noiChieu"
                    >
                      <option>Nơi Chiếu</option>
                     {this.props.theaterSchedule? this.renderDanhSachRap():null}
                    </select>
                </div>
                <div className="form-group">
                  <label>Mã Rạp:</label>
                  <select
                      className="form-control selectChoice"
                      onChange={this.handleChangeEdit}
                      name ="maRap"
                    >
                      <option>Mã Rạp</option>
                     {this.state.noiChieu!==""? this.renderMaRap():null}
                    </select>
                </div>
                <div className="form-group">
                  <label>Giá vé:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="giaVe"
                    onChange={this.handleChangeEdit}
                    placeholder="Nhập Giá Vé"
                    min="75000" max="125000"
                  />
                </div>
                <button type="submit" className="btn btn-update btn-success">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={this.handleClose}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movieReducer.movie,
    checkedSucessMovie: state.movieReducer.checkedSucessMovie,
    theaterSchedule: state.movieReducer.theaterSchedule,
    theaterInfo: state.movieReducer.theaterInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMovieList:() => {
      dispatch(action.actGetListMovieAPI());
    },
    addSchedule: lichChieu => {
      dispatch(action.actTaoLichChieu(lichChieu));
    },
    checkedSuccess: ()=>{
      dispatch(action.actUploadMovieSuccess())
    },
    getTheaterInfoSchedule:(id)=>{
      dispatch(action.actLayThongTinCumRapTheoHeThong(id))
    },
    getTheaterInfo: () => {
      dispatch(action.actLayThongTinRap());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalAddMovie);
