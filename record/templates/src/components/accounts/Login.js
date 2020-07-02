import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { createMessage } from '../../actions/actnmessages';

export class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  popDialog = (e) => {
    e.preventDefault();
    document.getElementById('sighup_dialog_sec').className = "d-block";
  }
  closeDialog = (event) => {
    event.preventDefault();
    document.getElementById('sighup_dialog_sec').className = "d-none";
  }

  render() {
    if (this.props.isAuthenticated && this.props.token !== null) {
      this.props.createMessage({ generalSuccessMessage: 'Welcome Back' });
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
    console.log("tokencheck = ", this.props.tokencheck)
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5 border border-primary" id="loginform">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>

            <div className="form-group text-center mx-auto">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p>
              Don't have an account? <a href="" onClick={this.popDialog}>Register</a>
            </p>
          </form>
          <div id="sighup_dialog_sec" className="d-none">
            <div className="shadow p-3 border border-rounded border-info" id="detail_dialog">
              <p className="font-weight-bold py-2 alert alert-info py-2">
                <span>&ensp;WHO ARE YOU? &ensp;&ensp;
                                            <a href="" className="text-secondary float-right" onClick={this.closeDialog}>&times;</a>
                </span>
              </p>
              <div className="text-center">
                <Link to="/signup">
                  <button className="font-weight-bold text-primary px-2 btn btn-default ">
                    <sub className="h6"> A <br /> client</sub>
                  </button>
                </Link>
                                                &ensp; &ensp; &ensp;
                                                <Link to="/staff_signup">
                  <button className="font-weight-bold text-primary px-2 btn btn-default">
                    <sub className="h6">A Medical <br /> Prectitioner </sub>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  tokencheck: state.authReducer,
});

export default connect(mapStateToProps, { login, createMessage })(Login);
