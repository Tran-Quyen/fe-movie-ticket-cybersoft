import React,{memo} from 'react'

function SelectEntriesOption() {
    return (
        <>
            <option value={10}>Select entries:</option>
              <option value={10}>10 </option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
        </>
    )
}
export default memo(SelectEntriesOption)