import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDataDetail, deleteData, getData } from '../../actions/RegcrudAction';
import RegForm from './RegForm'


class DetailView extends Component {
    state = {
        regdata: null,
    }
    static propTypes = {
        regdata: PropTypes.object,
    };
    toggleDeleteBtnOn = () => {
        document.getElementById('detail_dialog_sec').className = 'col-md-12 d-block'
    }
    toggleDeleteBtnOff = () => {
        document.getElementById('detail_dialog_sec').className = 'd-none'
    }
    toggleUpdateBtnOn = () => {
        document.getElementById('reg_form_sec').className = 'd-block'
        document.getElementById('detail_sec').className = 'd-none'
    }
    toggleUpdateBtnOff = () => {
        document.getElementById('reg_form_sec').className = 'd-none'
        document.getElementById('detail_sec').className = 'd-block'
    }

    DeleteAction = () => {
        if (this.props.match) {
            const { pk } = this.props.match.params
            this.props.deleteData(pk);
            this.props.history.push(`/listview`);
        }
    }
    stateChange = () => {
        const { regdata } = this.props
        setTimeout(function () {
            console.log('buikData', regdata)
            if (regdata !== null || !regdata) {
                document.getElementById('loadstatus').innerHTML = "NO AVALIBLE DATA"
            }
        }, 3000);
    }

    componentDidMount() {
        this.props.getData();
        if (this.props.match) {
            const { pk } = this.props.match.params
            this.props.getDataDetail(pk);
        }
        this.stateChange();
    }
    componentDidUpdate(provProps) {
        if (this.props.detail_reg_data !== provProps.detail_reg_data) {
            this.setState({ regdata: this.props.detail_reg_data, })
        }
    }
    render() {
        const { regdata } = this.state
        return (
            <div className="pb-1">
                <div id="detail_sec">
                    {regdata !== null ?
                        <div>
                            {this.props.staff || regdata.user.username === this.props.active_user ?
                                <div className="container p-5" id="content_sec">
                                    <div className="row">
                                        <div id="detail_dialog_sec" className="d-none">
                                            <div className="shadow p-3 border border-rounded border-info" id="detail_dialog">
                                                <p className="font-weight-bold py-2 alert alert-info py-2">
                                                    <span>
                                                        Are you sure you want to delete this DATA?
                                                    </span>
                                                </p>
                                                <div className="text-center">
                                                    <button className="font-weight-bold text-success  px-2" onClick={this.toggleDeleteBtnOff} >NO</button>
                                                    &ensp; &ensp; &ensp;
                                                    <button className="font-weight-bold text-danger px-2" onClick={this.DeleteAction}>YES</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row shadow border border-secondary curverme p-2">
                                        <div className="col-md-4 text-center d-block clearfix">
                                            {regdata.image ?
                                                <img src={regdata.image} className="img-fluid img-thumbnail rounded" alt="passport" />
                                                :
                                                <img src={"../../../../static/img/user.jpg"} className="img-fluid img-thumbnail rounded" alt="passport" />
                                            }
                                            <section className="px-5 mx-5 pt-5">
                                                <button className="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0 setactive" onClick={this.toggleUpdateBtnOn}>Update</button>

                                                <button className="btn btn-outline-danger btn-rounded btn-block my-4 waves-effect z-depth-0 setactive" onClick={this.toggleDeleteBtnOn}>Delete</button>
                                            </section>
                                        </div>
                                        <div className="col-md-8 d-block">
                                            <ul className="list-style">
                                                <li>
                                                    <span>  First Name: &ensp;</span>
                                                    <b>
                                                        {regdata.first_name}
                                                    </b>


                                                </li>
                                                <li>
                                                    <span>Last Name: &ensp;</span>
                                                    <b>
                                                        {regdata.last_name}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span className="pr-2">Gender: &ensp; &ensp;   </span>
                                                    <b>
                                                        {regdata.gender}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span>Blood Group: &ensp; &ensp; </span>
                                                    <b>
                                                        {regdata.bloodgroup}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span> Genotype:&ensp; &ensp; </span>
                                                    <b>
                                                        {regdata.genotype}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span className="pr-3">Birthday:  &ensp;</span>
                                                    <b>
                                                        {regdata.date_of_birth}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span> Email: &ensp;  &ensp; &ensp; &ensp;</span>
                                                    <b>
                                                        {regdata.email}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span> Address: &ensp; &ensp; </span>
                                                    <b>
                                                        {regdata.address}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span>Phone No.: &ensp; </span>
                                                    <b>
                                                        {regdata.phone_number}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span> terminal_illness: &ensp; &ensp; </span>
                                                    <b>
                                                        {regdata.terminal_illness}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span> virial_dieseasesy: &ensp; &ensp; </span>
                                                    <b>
                                                        {regdata.virial_dieseases}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span> Common_Illness: &ensp; &ensp; </span>
                                                    <b>
                                                        {regdata.Common_Illness}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span>  Entry Date:&ensp; &ensp; </span>
                                                    <b>
                                                        {regdata.created_at.slice(0, 10)}
                                                    </b>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* :
                                <p className="h1 text-center m-auto p-5">YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE</p>
                        } */}
                                </div>
                                :
                                <p className="h1 text-center m-auto p-5">YOU ARE NOT AUTHORIZED TO VIEW THIS PAGE</p>
                            }
                        </div>
                        :
                        <div>
                            <p className="text-center font-weight-bold h5 pt-3">
                                <span id="loadstatus">
                                    Loading....&ensp;<span className="spinner-grow text-secondary"></span>
                                </span>
                            </p>
                        </div>
                    }
                </div>

                <div className="d-none" id="reg_form_sec">
                    <RegForm updateBtn={this.toggleUpdateBtnOff} regdata={regdata} />
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    detail_reg_data: state.regdata_reducer.detail,
    active_user: state.regdata_reducer.active_user,
    staff: state.regdata_reducer.staff,
});
export default connect(mapStateToProps, { getDataDetail, deleteData, getData })(DetailView);

