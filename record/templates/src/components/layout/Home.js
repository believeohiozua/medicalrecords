import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { createMessage } from '../../actions/actnmessages';
import { getData } from '../../actions/RegcrudAction';

export class Home extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        authmsgchecker: PropTypes.object.isRequired,
    };

    popDialog = () => {
        document.getElementById('sighup_dialog_sec').className = "d-block";
    }
    closeDialog = (event) => {
        event.preventDefault();
        document.getElementById('sighup_dialog_sec').className = "d-none";
    }


    componentDidMount() {
        if (this.props.auth.token !== null) {
            this.props.getData();
        }
    }

    render() {
        const { auth } = this.props
        const { authmsgchecker } = this.props
        console.log('auth', auth, this.props.active_user, this.props.userlink)
        return (
            <Fragment>
                {auth.token === null || auth.token === undefined ?
                    <div>
                        <div className="text-center font-weight-bold h3 p-5 m-auto">
                            <p className="h3"> MEDICAL DATA MANAGEMENT SYSTEM </p>
                            <i className="h6">HELLO THERE! <br /> HOW IS YOUR HEALTH? <br />
                            Signup lets get to know more about you..!
                            </i>
                        </div>
                        <div className="row">
                            <div className="col-md-6 text-center py-4 bg-white shadow border border-warning">
                                <div className="shadow mx-auto py-5 bg-warning" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                        <Link to={"/metrics"} className="text-warning">METRICS</Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6 text-center py-4 bg-white shadow border border-primary">
                                <div className="shadow mx-auto py-5 bg-primary" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                        <Link to={"/"} className="text-primary">INQUIRES</Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6 text-center py-4 bg-white shadow border border-success">
                                <div className="shadow mx-auto py-5 bg-success" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs" onClick={this.popDialog}>
                                        <span className="text-success">SIGNUP</span>
                                    </button>
                                </div>

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
                            <div className="col-md-6 text-center py-4 shadow border-secondary border border-secondary">
                                <div className="shadow mx-auto py-5 bg-secondary" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                        <Link onClick={this.props.logout} to={"/login"} className="text-secondary">LOGIN</Link>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    :
                    <div>
                        <div className="text-center font-weight-bold py-3">
                            <p className="h3">MEDICAL DATA MANAGEMENT SYSTEM</p>
                        </div>


                        <div className="row">
                            <div className="col-12">
                                <p className="float-left h6 py-2 mx-auto">Hi &ensp;
                                <span className="text-success" id="togtocap">{this.props.active_user}</span>
                                </p>
                            </div>
                            <div className="col-md-6 text-center py-4 bg-white shadow border border-success">
                                <div className="shadow mx-auto py-5 bg-success" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                        <Link to={{
                                            pathname: `/bio/${this.props.userlink}`,
                                            state: { fromDashboard: false }
                                        }}
                                            className="text-success">UPDATE PROFILE</Link>

                                    </button>
                                </div>
                            </div>
                            {this.props.staff ?
                                <div className="col-md-6 text-center py-4 bg-white shadow border border-primary">
                                    <div className="shadow mx-auto py-5 bg-primary" id="home-sec">
                                        <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                            <Link to={"/listview"} className="text-primary">LIST VIEW</Link>
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="col-md-6 text-center py-4 bg-white shadow border border-primary">
                                    <div className="shadow mx-auto py-5 bg-primary" id="home-sec">
                                        <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                            <Link to={"/"} className="text-primary">INQUIRES</Link>
                                        </button>
                                    </div>
                                </div>
                            }

                            <div className="col-md-6 text-center py-4 bg-white shadow border border-warning">
                                <div className="shadow mx-auto py-5 bg-warning" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                        <Link to={"/metrics"} className="text-warning">METRICS</Link>

                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6 text-center py-4 shadow border-danger border border-danger">
                                <div className="shadow mx-auto py-5 bg-danger" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                        <Link onClick={this.props.logout} to={"/login"} className="text-danger"> LOGOUT</Link>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.authReducer,
    authmsgchecker: state.errors,
    active_user: state.regdata_reducer.active_user,
    userlink: state.regdata_reducer.userlink,
    staff: state.regdata_reducer.staff,
});

export default connect(mapStateToProps, { logout, createMessage, getData })(Home);

