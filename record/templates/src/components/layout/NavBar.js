import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getData } from '../../actions/RegcrudAction';


export class NavBar extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        authmsgchecker: PropTypes.object,
    };
    componentDidMount() {
        if (this.props.auth.token !== null) {
            this.props.getData();
        }
    }

    render() {
        const { auth } = this.props
        const { authmsgchecker } = this.props
        return (
            <div className="pt-3">
                {auth.token !== undefined && auth.token !== null ?
                    <div className="container">
                        {authmsgchecker.detail == "Invalid token." ?
                            <Link onClick={this.props.logout} to="/login"
                                className="btn-outline-primary btn-xs">
                                <small className="">LOGIN</small>
                            </Link>
                            :
                            <div className="col-md-5 h6 dropdown">
                                <span>&#8942;</span> Menu
                        <div className="dropdown-content py-2 px-3 h6">
                                    <Link to={"/"}
                                        className="btn-outline-info btn-xs">
                                        <small className="">HOME</small></Link>
                                    <Link to={"/metrics"}
                                        className="btn-outline-info btn-xs">
                                        <small className="">METRICS</small></Link>

                                    {this.props.staff ?
                                        <Link to={"/listview"}
                                            className="btn-outline-info btn-xs">
                                            <small className="">LIST VIEW</small></Link>
                                        :
                                        <Link to={"/"}
                                            className="btn-outline-info btn-xs">
                                            <small className="">INQUIRES</small></Link>
                                    }
                                    <Link to={{
                                        pathname: `/bio/${this.props.userlink}`,
                                        state: { fromDashboard: false }
                                    }}
                                        className="btn-outline-info btn-xs">
                                        <small className="">PROFILE</small>
                                    </Link>
                                    <Link onClick={this.props.logout} to={"/login"}
                                        className="btn-outline-danger btn-xs">
                                        <small className="">LOGOUT</small></Link>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <Link to={"/"}
                        className="btn-outline-info btn-xs p-5">
                        <small className="">HOME</small></Link>
                }


            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.authReducer,
    authmsgchecker: state.errors.msg,
    active_user: state.regdata_reducer.active_user,
    userlink: state.regdata_reducer.userlink,
    staff: state.regdata_reducer.staff,
});

export default connect(mapStateToProps, { logout, getData })(NavBar);
