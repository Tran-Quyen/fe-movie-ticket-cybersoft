import * as ActionTypes from "./../constants/ActionType.js";
import Axios from "axios";
export const actGetListMovieAPI = () => {
  return (dispatch) => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
    })
      .then(async (result) => {
        dispatch({
          type: await ActionTypes.GET_LIST_MOVIE,
          listMovie: await result.data,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actUpdateMovie = (user) => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return (dispatch) => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim",
      data: user,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`,
      },
    })
      .then((result) => {
        alert("Cập Nhật Thành Công");
        dispatch({
          type: ActionTypes.UPLOAD_MOVIE_IMAGE_CHECKED,
          checkedSucessMovie: true,
        });
      })
      .catch((err) => {
        alert("Cập nhật lỗi, kiểm tra lại hình ảnh");
      });
  };
};
export const actGetUserList = () => {
  return async (dispatch) => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
    })
      .then(async (result) => {
        dispatch({
          type: await ActionTypes.GET_USER_LIST,
          userList: await result.data,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actGetListMovieUpcomingAPI = () => {
  return (dispatch) => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP06",
    })
      .then(async (result) => {
        dispatch({
          type: ActionTypes.GET_LIST_MOVIE_UPCOMING,
          listMovie: await result.data,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actGetDetailMovieAPI = (id) => {
  return (dispatch) => {
    Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    })
      .then(async (result) => {
        dispatch({
          type: await ActionTypes.GET_DETAIL_MOVIE,
          movie: await result.data,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actLoading = () => {
  return {
    type: ActionTypes.LOADING,
  };
};
export const actUploadMovieSuccess = () => {
  return {
    type: ActionTypes.UPLOAD_MOVIE_IMAGE_CHECKED,
  };
};
export const actDeleteCheck = () => {
  return {
    type: ActionTypes.DELETED,
  };
};
export const actCheckAuthentication = (history) => {
  if (localStorage.getItem("UserHome") === null) {
    return history.push("/");
  }
};
export const actLoginAdmin = (user, history) => {
  return (dispatch) => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: user,
    })
      .then((result) => {
        // Lưu vào local storage
        if (result.data.maLoaiNguoiDung === "QuanTri") {
          localStorage.setItem("UserAdmin", JSON.stringify(result.data));
          history.push("/dashboard");
          window.location.reload();
          dispatch({
            type: ActionTypes.LOGIN,
            user: result.data,
          });
        }
      })
      .catch((err) => {
        alert("Bạn chưa có quyền đăng nhập hãy tạo tài khoản");
        return err;
      });
  };
};
export const actSignupHome = (user, history) => {
  return (dispatch) => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      data: user,
    })
      .then(async (result) => {
        setTimeout(() => {
          history.push("/login");
        }, 500);
        dispatch({
          type: await ActionTypes.SIGNUP,
          user: await result.data,
          signuped: await result.status,
        });
      })
      .catch(async (err) => {
        dispatch({
          type: await ActionTypes.SIGNUP,
          errorSignup: await err.response.data,
        });
        return err;
      });
  };
};
export const actLoginHome = (user, history) => {
  return (dispatch) => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      data: user,
    })
      .then((result) => {
        const id = JSON.parse(localStorage.getItem("DetailId"));
        setTimeout(() => {
          id ? history.push(`/detail-movie/${id}`) : history.push("/");
        }, 500);
        dispatch({
          type: ActionTypes.LOGIN,
          loginedstt: result.status,
          user: result.data,
        });
        localStorage.setItem("UserHome", JSON.stringify(result.data));
      })
      .catch(async (err) => {
        dispatch({
          type: ActionTypes.LOGIN,
          errorData: err.response.data,
        });
        return err;
      });
  };
};
export const actGetRoomList = (id) => {
  return (dispatch) => {
    Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
    })
      .then(async (result) => {
        dispatch({
          type: await ActionTypes.GET_ROOM_LIST,
          room: await result.data,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actGetDateTimeMovie = (id) => {
  return (dispatch) => {
    Axios({
      mẹthod: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    })
      .then((result) => {
        dispatch({
          type: ActionTypes.GET_DETAIL_DATETIME_MOVIE,
          movieDate: result.data,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actDatVe = (user, history) => {
  const UserHome = JSON.parse(localStorage.getItem("UserHome"));
  return (dispatch) => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
      data: user,
      headers: {
        Authorization: `Bearer ${UserHome.accessToken}`,
      },
    })
      .then((result) => {
        history.push("/ticket-detail");
        dispatch(result.data);
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actLayThongTinUser = (user) => {
  return (dispatch) => {
    Axios({
      method: "POST",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      data: user,
    })
      .then(async (result) => {
        localStorage.setItem("UserInfo", JSON.stringify(result.data));
        dispatch({
          type: await ActionTypes.GET_USER_INFORMATION,
          userInformation: await result.data,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actQuanLyVeUser = (user) => {
  return (dispatch) => {
    Axios({
      method: "POST",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      data: user,
    })
      .then((result) => {
        dispatch({
          type: ActionTypes.GET_TICKET_DETAIL,
          tickets: result.data,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actUpdateUserInformation = (user) => {
  const UserHome = JSON.parse(localStorage.getItem("UserHome"));
  return (dispatch) => {
    Axios({
      method: "PUT",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data: user,
      headers: {
        Authorization: `Bearer ${UserHome.accessToken}`,
      },
    })
      .then((result) => {
        setTimeout(function () {
          window.location.reload();
        }, 500);
        dispatch({
          type: ActionTypes.UPDATESUCCESS,
          success: true,
        });
        return result;
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actUpdateUserAdminOnly = (user) => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return (dispatch) => {
    Axios({
      method: "PUT",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data: user,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`,
      },
    })
      .then((result) => {
        setTimeout(function () {
          alert("Cập nhật thành công");
        }, 500);
        dispatch(result.data);
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actUpdateUserAdminInformation = (user) => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return (dispatch) => {
    Axios({
      method: "PUT",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data: user,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`,
      },
    })
      .then((result) => {
        setTimeout(function () {
          alert("Cập nhật thành công");
        }, 500);
        dispatch(result.data);
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actSearchUser = (id) => {
  return (dispatch) => {
    Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${id}`,
    })
      .then((result) => {
        dispatch({
          type: ActionTypes.SEARCH_USER,
          keyWord: result.data,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};

export const actDeleteUser = (tk) => {
  return (dispatch) => {
    const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
    Axios({
      method: "DELETE",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${tk}`,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`,
      },
    })
      .then(async (result) => {
        alert(result.data);
        dispatch({
          type: await ActionTypes.DELETE_USER,
        });
      })
      .catch((err) => {
        alert(err.response.data);
        return err;
      });
  };
};
export const actDeleteMovie = (movie) => {
  return async (dispatch) => {
    const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
    Axios({
      method: "DELETE",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${movie}`,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`,
      },
    })
      .then(async (result) => {
        alert(result.data);
        dispatch({
          type: await ActionTypes.DELETE_MOVIE,
        });
      })
      .catch((err) => {
        alert(err.response.data);
        return err;
      });
  };
};
export const actThemNguoiDung = (user) => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return (dispatch) => {
    Axios({
      method: "POST",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      data: user,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`,
      },
    })
      .then((result) => {
        alert("Đăng kí thành công");
        dispatch(result.data);
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actThemMovie = (user) => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return (dispatch) => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim",
      data: user,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`,
      },
    })
      .then((result) => {
        alert("Cập Nhật Thành Công");
        dispatch({
          type: ActionTypes.UPLOAD_MOVIE_IMAGE_CHECKED,
          checkedSucessMovie: true,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actthemHinhAnhPhim = (hinhAnh) => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return (dispatch) => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyPhim/UploadHinhAnhPhim",
      data: hinhAnh,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`,
      },
    })
      .then((result) => {
        alert(result.data);
        return result.data;
      })
      .catch((err) => {
        return err.data;
      });
  };
};
export const actTaoLichChieu = (lichChieu) => {
  const UserAdmin = JSON.parse(localStorage.getItem("UserAdmin"));
  return (dispatch) => {
    Axios({
      method: "POST",
      url: "http://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
      data: lichChieu,
      headers: {
        Authorization: `Bearer ${UserAdmin.accessToken}`,
      },
    })
      .then((result) => {
        alert("Thêm Lịch Chiếu Thành Công ahihi");
        return result.data;
      })
      .catch((err) => {
        alert(err.response);
        return err.data;
      });
  };
};
export const actLayThongTinRap = () => {
  return (dispatch) => {
    Axios({
      method: "GET",
      url:
        "http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
    })
      .then((result) => {
        dispatch({
          type: ActionTypes.GET_INFO_THEATER,
          theaterInfo: result.data,
        });
      })
      .catch((err) => {
        return err.data;
      });
  };
};
export const actLayThongTinCumRapTheoHeThong = (id) => {
  return (dispatch) => {
    Axios({
      method: "GET",
      url: `http://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`,
    })
      .then((result) => {
        dispatch({
          type: ActionTypes.GET_THEATER_SCHEDULE,
          theaterSchedule: result.data,
        });
      })
      .catch((err) => {
        return err.data;
      });
  };
};

export const actLayNhanXet = (id) => {
  return (dispatch) => {
    Axios({
      method: "GET",
      url: `http://5dce9e0375f9360014c25fe6.mockapi.io/api/comment/${id}`,
    })
      .then(async (result) => {
        dispatch({
          type: await ActionTypes.GET_COMMENT,
          comment: await result.data,
        });
      })
      .catch((err) => {
        return err;
      });
  };
};

export const actNhanXet = (nhanXet, id) => {
  return (dispatch) => {
    Axios({
      method: "POST",
      url: `http://5dce9e0375f9360014c25fe6.mockapi.io/api/comment/${id}/danhSachComment`,
      data: nhanXet,
    })
      .then(async (result) => {
        dispatch(result.data);
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actxoaComment = (maPhim, maComment) => {
  return (dispatch) => {
    Axios({
      method: "DELETE",
      url: `http://5dce9e0375f9360014c25fe6.mockapi.io/api/comment/${maPhim}/danhSachComment/${maComment}`,
    })
      .then((result) => {
        dispatch(result.data);
      })
      .catch((err) => {
        return err;
      });
  };
};
export const actSuaComment = (maPhim, maComment, comment) => {
  return (dispatch) => {
    Axios({
      method: "PUT",
      url: `http://5dce9e0375f9360014c25fe6.mockapi.io/api/comment/${maPhim}/danhSachComment/${maComment}`,
      data: comment,
    })
      .then((result) => {
        dispatch(result.data);
      })
      .catch((err) => {
        return err;
      });
  };
};
