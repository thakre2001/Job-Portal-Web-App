import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";
import { UserContext } from "../UserContext";

const Footer = () => {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const goToProfile = () => {
    if (user.role === 'USER') {
      navigate('/page/jobseeker-profile')
    } else if (user.role === 'RECRUITER') {
      navigate('/page/recruiter-profile')
    } else {
      navigate('/page/admin-profile')
    }
  };
  return (
    <footer className="footer bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Company Info */}
          <div className="col-12 col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold mb-3">JobConnect</h5>
            <p>
              Your trusted partner in career growth. Find the best jobs, connect
              with top companies, and build your future.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
              {/* <a href="#" className="text-white"> */}
                <i className="fab fa-facebook fa-lg"></i>
              {/* </a> */}
              {/* <a href="#" className="text-white"> */}
                <i className="fab fa-twitter fa-lg"></i>
              {/* </a> */}
              {/* <a href="#" className="text-white"> */}
                <i className="fab fa-linkedin fa-lg"></i>
              {/* </a> */}
              {/* <a href="#" className="text-white"> */}
                <i className="fab fa-instagram fa-lg"></i>
              {/* </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/page/jobpage"
                  className="text-white text-decoration-none"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/page/companies"
                  className="text-white text-decoration-none"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/page/jobpostform"
                  className="text-white text-decoration-none"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white text-decoration-none">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-6 col-md-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li
                onClick={goToProfile}
                className="text-white text-decoration-none"
              >
                My Profile
              </li>
              <li>
                <Link
                  to="/page/resumebuilder"
                  className="text-white text-decoration-none"
                >
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  to="/page/contactus"
                  className="text-white text-decoration-none"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/page/helpcenter"
                  className="text-white text-decoration-none"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
            <p>
              <i className="fas fa-map-marker-alt me-2"></i> Pune, Maharashtra,
              India
            </p>
            <p>
              <i className="fas fa-envelope me-2"></i> support@jobconnect.com
            </p>
            <p>
              <i className="fas fa-phone me-2"></i> +91 98765 43210
            </p>
          </div>
        </div>

        <hr className="border-top border-light" />

        <div className="text-center pt-2">
          <p className="mb-1">
            © {new Date().getFullYear()} JobConnect. All Rights Reserved.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/privacy-policy"
              className="text-white text-decoration-none"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              to="/terms-of-service"
              className="text-white text-decoration-none"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
