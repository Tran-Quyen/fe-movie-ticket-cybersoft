import React, { memo } from "react";

function footer() {
  return (
    <div className="footer" id="footer">
      <div className="container">
        <div className="footer_trust_top">
          <div className="trustlogos" />
        </div>
        <div className="footer_main desktop">
          <div className="col-xs-5 col-md-3 col-lg-3 footer-left">
            <h4>Find Out More</h4>
            <ul className="footer_list">
              <li>
                <a href="https://tix.vn/quyen-loi-thanh-vien/">About Us</a>
              </li>
              <li>
                <a href="https://tix.vn/brand-guideline/">Brand Guidelines</a>
              </li>
              <li>
                <a href="https://tix.vn/faq">FAQ's</a>
              </li>
              <li>
                <a href="https://tix.vn/quy-che-hoat-dong">Policies</a>
              </li>
              <li>
                <a href="https://tix.vn/thoa-thuan-su-dung">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-xs-12 col-md-6 col-md-pull-3 col-lg-6 footer_middle">
            <h4>
              Be the first to know about <strong>Movie Theater</strong>
            </h4>
            <p>
              Subscribe to get exclusive offers on the world’s greatest movie
              news.
            </p>
            <form className="hero-cta__form ">
              <div className="elcontainer">
                <div className="inner-wrap submit-container">
                  <div className="hero-cta__input-wrap">
                    {" "}
                    <input
                      type="email"
                      name="data[email]"
                      required
                      id="hero-cta-email"
                      placeholder="Enter Your Email Address"
                    />
                  </div>{" "}
                  <button type="submit" className="emailsignup">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-xs-7 col-md-3 col-md-push-6 col-lg-3 footer-right">
            <div className="footerbox">
              <h4>Contact Us</h4>
              <p>We're ready to help!</p>
              <ul className="footer_list">
                <li>VND | VIETNAM</li>
                <li className="phone">+84 123 123 123</li>
                <li>SIN | SINGAPORE</li>
                <li className="phone">+65 8315 3444</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="footer__partners">
            <img
              alt="footer-partners"
              src="https://www.authenticireland.com/wp-content/uploads/2018/04/Bottom_Trust2.png"
            />
          </div>
          <div className="footer_copyright">
            <p>© 2020 All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(footer);
