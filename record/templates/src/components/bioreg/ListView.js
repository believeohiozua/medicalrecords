import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getData } from '../../actions/RegcrudAction';
import SearchBar from "./SearchBar"




export class ListView extends Component {


    static propTypes = {
        list_reg_data: PropTypes.array,
    };

    loadNextData = () => {
        const { next } = this.props
        if (next !== null || next !== undefined) {
            this.props.getData(next);
        }
    }

    loadPreviousData = () => {
        const { previous } = this.props
        console.log(previous)
        if (previous !== null || previous !== undefined) {
            this.props.getData(previous);
        }
    }

    stateChange = () => {
        const { list_reg_data } = this.props
        setTimeout(function () {
            console.log('buikData', list_reg_data)
            if (list_reg_data.length == 0) {
                document.getElementById('loading').innerHTML = "NO AVALIBLE DATA"
            }
        }, 3000);
    }
    componentDidMount() {
        this.props.getData();
        this.stateChange();
    }

    render() {
        const next = this.props.next
        const previous = this.props.previous
        const buikData = this.props.list_reg_data
        return (
            <Fragment>
                {this.props.staff ?
                    <div>
                        <div>
                            <h3 className="text-center h3 pb-3"><u>Entry List</u></h3>
                        </div>
                        <div className="container-fluid py-2">
                            <div className="row">
                                <div className="col-md-12">
                                    <SearchBar />
                                    <hr />
                                </div>
                                {buikData.length > 0 ? buikData.map((regdata) => {
                                    if (regdata.first_name) {
                                        return (
                                            <div className="col-md-3  py-2">
                                                <div className="text-center shadow">
                                                    {regdata.image ?
                                                        <img
                                                            src={regdata.image}
                                                            className="img-thumbnail img-fluid rounded"
                                                            alt="Passport"
                                                            height="190"
                                                            width="170" />
                                                        :
                                                        <img
                                                            src={"../../../../static/img/user.jpg"}
                                                            className="img-thumbnail img-fluid rounded"
                                                            alt="Passport"
                                                            height="190"
                                                            width="170" />
                                                    }
                                                    <div className="h5 text-center">
                                                        <strong className="pb-2">
                                                            <Link maintainScrollPosition={false}
                                                                to={{
                                                                    pathname: `/bio/${regdata.pk}`,
                                                                    state: { fromDashboard: false }
                                                                }}>
                                                                <span className="h5 text-secondary">
                                                                    {regdata.first_name}  {regdata.last_name}
                                                                </span>
                                                            </Link>
                                                        </strong>
                                                        <br />
                                                        <sup className="small-font">
                                                            <small>-{regdata.pk}-|    Entry Date: {regdata.created_at.slice(0, 10)}</small>
                                                        </sup>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    }
                                }) :
                                    <div className="text-center p-5">
                                        <div>
                                            <p>
                                                <span id="loading" className="text-center font-weight-bold h5 pt-3">
                                                    Loading....&ensp;<span className="spinner-border text-secondary"></span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                }
                                <div className="col-md-12">
                                    <div className="text-right align-items-center float-right">
                                        {next !== null ?
                                            <button onClick={this.loadNextData} className="btn btn-outline-primary btn-sm">
                                                Next</button> : ''}
                                    </div>
                                    <div className="text-center align-items-center float-left">
                                        {previous !== null ?
                                            <button onClick={this.loadPreviousData} className="btn btn-outline-primary  btn-sm">
                                                Previous</button> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <p className="h1 text-center m-auto p-5">YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE</p>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    list_reg_data: state.regdata_reducer.regdata,
    next: state.regdata_reducer.next,
    previous: state.regdata_reducer.previous,
    staff: state.regdata_reducer.staff,
});
export default connect(mapStateToProps, { getData })(ListView);
