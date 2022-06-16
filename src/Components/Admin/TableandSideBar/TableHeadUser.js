import React,{memo} from 'react'
import * as Icon from "@material-ui/icons"
import IconButton from '@material-ui/core/IconButton';
function TableHeadMovie() {
    return (
        <div className="table100-head">
        <table>
          <thead>
            <tr className="row100 head">
              <th className="cell100 column1">Tài Khoản</th>
              <th className="cell100 column2">Họ Tên</th>
              <th className="cell100 column3">Email</th>
              <th className="cell100 column4">Số ĐT</th>
              <th className="cell100 column5">Type</th>
              <th className="cell100 column6">Mật khẩu</th>
              <th className="cell100 column7"><span>Action</span>
              <IconButton className="btnADDUSER" color="secondary" data-toggle="modal" data-target="#myModalAdd" aria-label="Add">
              <Icon.Add />
             </IconButton>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    )
}
export default memo(TableHeadMovie)