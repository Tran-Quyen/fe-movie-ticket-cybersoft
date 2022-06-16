import React,{memo} from 'react'

 function TableMovieHead(props) {
    return (
        <div className="table100-head">
        <table>
          <thead>
            <tr className="row100 head MovieManagement">
              <th className="cell100 column1">{props.column1}</th>
              <th className="cell100 column2">{props.column2}</th>
              <th className="cell100 column6">{props.column6}</th>
              <th className="cell100 column3">{props.column3}</th>
              <th className="cell100 column4">{props.column4}</th>
              <th className="cell100 column5">{props.column5}</th>
              <th className="cell100 column7">Action</th>
            </tr>
          </thead>
        </table>
      </div>
    )
}
export default memo(TableMovieHead)