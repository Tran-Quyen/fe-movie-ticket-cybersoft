import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../Store/action";
import * as Icon from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import TableMovieHead from "../../Components/Admin/TableandSideBar/TableHead";
import SelectEntriesOption from "../../Components/Admin/SelectEntriesOption"
import Pagination from '@material-ui/lab/Pagination';
import ModalEditMovie from "../../Components/Admin/Modal/ModalEditMovie"
import ModalAddMovie from "../../Components/Admin/Modal/ModalAddMovie"
import ModalTaoLichChieu from "../../Components/Admin/Modal/ModalTaoLichChieu"
class MovieManagement extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      listMovie :[],
      perPage: 10,
      currentPage: 0,
      pageCount: 0,
      keyWord: "",
      maPhimDelete: "",
      maPhim: 0,
      tenPhim: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    this.props.getMovieList()
    this.receivedData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  UNSAFE_componentWillReceiveProps=async(nextProps)=> {
    if ((await this.state.listMovie !==await this.props.listMovie)|| (this.state.deleted)) {
      this.setState(
        {
            listMovie: nextProps.listMovie
        },
        () => {
          this.receivedData();
        }
      );
    }
}
handleAdd = e=>{
 this.props.checkedSuccess()
}
  handleDelete = async event => {
    event.persist()
    const eventValue = event.target.value
    this.props.deleteMovie(eventValue)
    this.setState({
          maPhimDelete:eventValue,
        });
        await this.props.getMovieList()
        if(this.props.listMovie){
            let a = this.props.listMovie
            this.setState({
                listMovie:a
            },()=>{this.props.getMovieList()})
          }
    }
  handleEdit = e => {
    e.persist();
    let maPhim  = e.target.value
    this.setState({
      maPhim,
    },()=>this.props.getDetailMovie(maPhim))
  };
  async receivedData(){
          const data =await this.state.listMovie;
          const slice = await data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
          );
          let postData = slice.map((pd, index) => (
            <React.Fragment key={index}>
              <div className="table100-body js-pscroll">
                <table>
                  <tbody>
                    <tr className="row100 body MovieBody">
                      <td className="cell100 column1">{pd.maPhim}</td>
                      <td className="cell100 column2">{pd.tenPhim}</td>
                      <td className="cell100 column6">{pd.biDanh}</td>
                      <td className="cell100 column3">{pd.trailer}</td>
                      <td className="cell100 column4">{pd.hinhAnh}</td>
                      <td className="cell100 column5">
                        {new Date(pd.ngayKhoiChieu).toDateString()}
                      </td>
                      <td className="cell100 column7">
                        <IconButton onClick={this.handleEdit} value={pd.maPhim} data-toggle="modal" data-target="#myModal" aria-label="Add">
                             <Icon.Edit />
                        </IconButton>
                        <IconButton onClick={this.handleDelete} value={pd.maPhim} aria-label="delete">
                             <Icon.Delete />
                           </IconButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ));
          if (this._isMounted) {
            this.setState({
              pageCount: Math.ceil(data.length / this.state.perPage),
              postData
            });
          }
  };
  handleChange = e => {
    const selectedPage = parseInt(e.target.innerHTML)
    const offset = (selectedPage-1) * this.state.perPage;
    if(selectedPage===1){
      this.setState(
        {
          currentPage: 0,
          offset: 0
        },
        () => {
          this.receivedData();
        }
      );
    }
    else{
      this.setState(
        {
          currentPage: selectedPage,
          offset,
        },
        () => {
          this.receivedData();
        }
      );
    }
    };
  handlingChange = e => {
    let perPage = e.target.value;
    this.setState({
        perPage
      },
      () => {
        this.receivedData();
      })};
  render() {
    return (
      <div>
        <div className="limiter MovieComponent">
          <div className="selectEntries mb-4 d-flex">
            <select onChange={this.handlingChange}>
            <SelectEntriesOption />
            </select>
            <button
              onClick={this.handleAdd}
              data-toggle="modal"
              data-target="#ModalAdd"
              className="btnAddPhim btn"
            >
              Add Phim
            </button>
            <button
              onClick={this.handleTaoLichChieu}
              data-toggle="modal"
              data-target="#ModalTaoLichChieu"
              className="btnAddPhim btn"
            >
              Tạo Lịch Chieu
            </button>
          </div>
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100 ver2 m-b-110">
                <TableMovieHead column1 ={"Mã Phim"} column2 ={"Tên Phim"} column6 ={"Bí Danh"} column3 ={"Trailer"}
                  column4 = {"Hình Ảnh"} column5 ="Ngày khởi Chiếu"
                />
                {this.state.postData}
              <Pagination onChange={this.handleChange} pages={this.state.postData} containerclassname={"pagination"} subcontainerclassname={"pages pagination"} count={this.state.pageCount} color="secondary" hidePrevButton hideNextButton/>
              </div>
            </div>
          </div>
        </div>
       <ModalEditMovie idPhim={this.state.maPhim} /> 
      <ModalAddMovie />
      <ModalTaoLichChieu />
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        listMovie: state.movieReducer.listMovie,
        checkedSucessMovie: state.movieReducer.checkedSucessMovie
    };
  };
const mapDispatchToProps = dispatch => {
  return {
    getMovieList:() => {
        dispatch(action.actGetListMovieAPI());
      },
    deleteMovie: movie => {
      dispatch(action.actDeleteMovie(movie));
    },
    addMovie: tk => {
      dispatch(action.actThemMovie(tk));
    },
    checkedSuccess: ()=>{
      dispatch(action.actUploadMovieSuccess())
    },
    getDetailMovie : id =>{
      dispatch(action.actGetDetailMovieAPI(id))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieManagement);
