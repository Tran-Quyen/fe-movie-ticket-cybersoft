import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../Store/action";
import * as Icon from "@material-ui/icons";
import * as Core from "@material-ui/core";
import { Pagination} from "@material-ui/lab/";
import SelectEntriesOption from "../../Components/Admin/SelectEntriesOption";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import TableHeadUserTable from "../../Components/Admin/TableandSideBar/TableHeadUser";
import ModalEditUser from "../../Components/Admin/Modal/ModalEditUser";
import ModalAddUser from "../../Components/Admin/Modal/ModalAddUser"
class UserManagement extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 10,
      dataUser: [],
      currentPage: 0,
      pageCount: 0,
      keyWord: "",
      taiKhoanDelete: "",
      taiKhoan: "",
      check:false,
      typeUser: "",
      maLoaiNguoiDung:"",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    this.props.getUserList();
    this.receivedData();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
      if (((this.state.dataUser !== this.props.userList)&&(this.state.keyWord ==="")) || this.state.check) {
        this.setState(
          {
            dataUser: nextProps.userList
          },
          () => {
            this.receivedData();
          }
        );
      }
      else if(this.state.keyWord !==""){
        this.setState({
          dataUser:nextProps.keyWord
        },()=>{
          this.receivedData();
        })
      }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChangeSearch = e => {
    if (e.target.value !== "") {
      this.setState(
        {
          keyWord: e.target.value
        },
        () => this.props.searchUser(this.state.keyWord)
      );
    } else {
      this.setState({
        keyWord: "",
        offset: 0
      });
    }
  };
  handleDelete =async event => {
    event.persist()
    const eventValue = event.target.value
    this.props.deleteUser(eventValue);
    this.setState({
      taiKhoanDelete:eventValue
    },()=>{this.props.getUserList()
    })
    await this.props.getUserList()
    if(this.props.userList){
      let a =this.props.userList
      this.setState({
        dataUser:a
      },()=>{this.props.getUserList()})
    }
  };
  handleEdit = event => {
    event.persist();
    let typeuser= event.target.getAttribute("typeuser")
    let taiKhoan = event.target.value;
    this.setState(
      {
        taiKhoan,
        check:true,
        maLoaiNguoiDung: typeuser
      },
      () => this.props.getUserInformation({ taiKhoan })
    );
  };

 async receivedData() {  
    const data = (await this.state.keyWord==="")?( await this.state.dataUser):( this.props.keyWord)
        const slice =await data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );
        const MainTable = (props) => (
          <div className="table100-body js-pscroll">
                    <table>
                      <tbody>
                        <tr className="row100 body">
                          <td className="cell100 column1">{props.pd.taiKhoan}</td>
                          <td className="cell100 column2">{props.pd.hoTen}</td>
                          <td className="cell100 column3">{props.pd.email}</td>
                          <td className="cell100 column4">{props.pd.soDt}</td>
                          <td className="cell100 column5">{props.pd.maLoaiNguoiDung}</td>
                          <td className="cell100 column6">{props.pd.matKhau}</td>
                          <td className="cell100 column7">
                          <IconButton onClick={this.handleEdit} typeuser={props.pd.maLoaiNguoiDung} value={props.pd.taiKhoan} data-toggle="modal" data-target="#myModal" aria-label="Add">
                             <Icon.Edit />
                           </IconButton>
                            <IconButton onClick={this.handleDelete} value={props.pd.taiKhoan} aria-label="delete">
                             <Icon.Delete />
                           </IconButton>
                            <Link to={`/quan-ly-ve/${props.pd.taiKhoan}`} value={props.pd.taiKhoan}>
                              <IconButton>
                             <Icon.ArrowForward />
                           </IconButton>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
      );      
        let postData = slice.map((pd, index) => (
          <React.Fragment key={index}>
           <MainTable pd={pd}></MainTable>
          </React.Fragment>
        ));
        if (this._isMounted) {
          this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            postData,
          });
        }
  }
  handleChange = e => {
    const selectedPage = parseInt(e.target.innerHTML);
    const offset = (selectedPage - 1) * this.state.perPage;
    if (selectedPage === 1) {
      this.setState(
        {
          currentPage: 0,
          offset: 0
        },
        () => {
          this.receivedData();
        }
      );
    } else {
      this.setState(
        {
          currentPage: selectedPage,
          offset: offset
        },
        () => {
          this.receivedData();
        }
      );
    }
  };
  handlingChange = e => {
    let perPage = e.target.value;
    this.setState(
      {
        perPage
      },
      () => {
        this.receivedData();
      }
    );
  };
  render() {
    return (
      <div>
        <div className="limiter">
        <ModalAddUser />
          <div className="selectEntries mb-4 d-flex">
            <select className="mr-5" onChange={this.handlingChange}>
              <SelectEntriesOption />
            </select>
            <Core.FormControl>
              <Core.InputLabel htmlFor="input-with-icon-adornment">
                Search User
              </Core.InputLabel>
              <Core.Input
                id="input-with-icon-adornment"
                onChange={this.handleChangeSearch}
                startAdornment={
                  <Core.InputAdornment position="start">
                    <Icon.AccountCircle />
                  </Core.InputAdornment>
                }
              />
            </Core.FormControl>
          </div>
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100 ver2 m-b-110">
                <TableHeadUserTable />
                {this.state.postData}
                <div className="d-flex">
                  <Pagination
                    onChange={this.handleChange}
                    pages={this.state.postData}
                    count={this.state.pageCount - 1}
                    color="secondary"
                    hidePrevButton
                    hideNextButton
                    size="large"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
       {<ModalEditUser typeUser={this.state.maLoaiNguoiDung} idUser={this.state.taiKhoan} />}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    keyWord: state.movieReducer.keyWord,
    userList: state.movieReducer.userList,
    userInformation: state.movieReducer.userInformation
  };
};
const mapDispatchToProps = dispatch => {
  return {
    searchUser: id => {
      dispatch(action.actSearchUser(id));
    },
    deleteUser: tk => {
      dispatch(action.actDeleteUser(tk));
    },
    getUserInformation: tk => {
      dispatch(action.actLayThongTinUser(tk));
    },
    getUserList: () => {
      dispatch(action.actGetUserList());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
