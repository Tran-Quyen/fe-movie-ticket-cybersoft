import React ,{memo} from 'react'
import Footer from "../../Components/Admin/Footer"

function Dashboard() {
  return (
    <>
    <div id="content">
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-dark">Movie Theater Project</h1>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Develop Information</h6>
              </div>
              <div className="card-body">
                <p>This Project is built by Thành Chí and Công Minh, base on React framework and other things</p>
                <p className="mb-0">Thanks for watching our project</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        <Footer />
<a className="scroll-to-top rounded" href="#page-top">
  <i className="fas fa-angle-up" />
</a>
</>
  )
}
export default memo(Dashboard)