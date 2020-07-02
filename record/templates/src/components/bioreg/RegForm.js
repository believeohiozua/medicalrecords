import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Register, updateRegister } from '../../actions/RegcrudAction';
import { Redirect } from 'react-router-dom';
import { createMessage } from '../../actions/actnmessages';
import { Link } from 'react-router-dom';


export class RegForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            address: "",
            gender: "",
            bloodgroup: "",
            genotype: "",
            date_of_birth: "",
            phone_number: "",
            image: "",
            terminal_illness: "",
            virial_dieseases: "",
            Common_Illness: "",
            errors: {},

        }
    }

    static propTypes = {
        Register: PropTypes.func.isRequired,
        updateRegister: PropTypes.func.isRequired,

    };
    defaultState = () => {
        this.setState({
            first_name: "",
            last_name: "",
            email: "",
            address: "",
            gender: "",
            bloodgroup: "",
            genotype: "",
            date_of_birth: "",
            phone_number: "",
            image: "",
            terminal_illness: "",
            virial_dieseases: "",
            Common_Illness: "",
        })
    };


    clearForm = event => {
        if (event) {
            event.preventDefault()
        }
        const { regdata } = this.props
        console.log('formData', regdata)
        this.dataCreateForm.reset()
        this.defaultState()
        document.getElementById("canvas").className = 'd-none';
        stopStreaming();
    };


    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const formData = this.state;
        let imgChecker = document.getElementById('image')
        let gender = document.getElementById('gender')
        let terminal_illness = document.getElementById('terminal_illness')
        let virial_dieseases = document.getElementById('virial_dieseases')
        let Common_Illness = document.getElementById('Common_Illness')

        if (imgChecker.value) {
            formData['image'] = imgChecker.value
        } else {
            alert('This Form is Submitted Without Imgae Caption!')
        };
        if (gender.value) {
            formData['gender'] = gender.value
        }
        if (terminal_illness.value) {
            formData['terminal_illness'] = terminal_illness.value
        }
        if (virial_dieseases.value) {
            formData['virial_dieseases'] = virial_dieseases.value
        }
        if (Common_Illness.value) {
            formData['Common_Illness'] = Common_Illness.value
        }
        const { regdata } = this.props
        console.log('formData', regdata, formData)
        if (regdata !== undefined) {
            this.props.updateRegister(regdata.pk, formData);
            this.props.updateBtn();
            this.props.createMessage({ generalSuccessMessage: 'Update Successful' });
        } else {
            this.props.Register(formData);
            this.props.createMessage({ generalSuccessMessage: 'Registration Successful' });
            document.getElementById('reg_dialog_sec').className = "d-block"
        }
    };


    continueReg = () => {
        this.clearForm();
        document.getElementById('reg_dialog_sec').className = "d-none"

    }


    componentDidUpdate(provProps) {
        if (this.props.regdata !== provProps.regdata) {
            const { regdata } = this.props
            if (regdata !== undefined && regdata !== null) {
                this.setState({
                    first_name: regdata.first_name,
                    last_name: regdata.last_name,
                    email: regdata.email,
                    address: regdata.address,
                    gender: regdata.gender,
                    bloodgroup: regdata.bloodgroup,
                    genotype: regdata.genotype,
                    date_of_birth: regdata.date_of_birth,
                    phone_number: regdata.phone_number,
                    image: regdata.image,
                    terminal_illness: regdata.terminal_illness,
                    virial_dieseases: regdata.virial_dieseases,
                    Common_Illness: regdata.Common_Illness,
                })
            } else {
                this.defaultState()
            }
        }
    }

    render() {
        const {
            first_name,
            last_name,
            email,
            address,
            gender,
            date_of_birth,
            phone_number,
            image,
            terminal_illness,
            virial_dieseases,
            Common_Illness,
            bloodgroup,
            genotype
        } = this.state;

        return (
            <div className="container">
                <div id="reg_dialog_sec" className="d-none">
                    <div className="shadow p-3 border border-rounded border-info" id="detail_dialog">
                        <p className="font-weight-bold py-2 alert alert-info py-2">
                            <span>REGISTRATION SUCCESSFUL!</span>
                        </p>
                        <div className="text-center">
                            <button className="font-weight-bold text-success px-2" onClick={this.continueReg} >ADD MORE</button>
                            &ensp; &ensp; &ensp;
                            <Link to="/listview">
                                <button className="font-weight-bold text-primary px-2">
                                    View List
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <h3 className="text-center h3">Data Registration</h3>
                <form onSubmit={this.onSubmit} ref={(el) => this.dataCreateForm = el}>
                    <fieldset className="pb-5">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label htmlFor="first_name"> Names
                                    <div className="row">
                                                <div className="col-6">
                                                    <input type="text"
                                                        name="first_name"
                                                        className="form-control"
                                                        id="first_name"
                                                        placeholder="First name"
                                                        ref={this.RegFirst_NameRef}
                                                        value={first_name}
                                                        onChange={this.onChange}
                                                        required="required" />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text"
                                                        name="last_name"
                                                        className="form-control "
                                                        id="last_name"
                                                        placeholder="Last name"
                                                        ref={this.RegLast_NameRef}
                                                        value={last_name}
                                                        onChange={this.onChange}
                                                        required="required" />
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">E-mail</label>
                                        <input type="email"
                                            name="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="E-mail"
                                            value={email}
                                            onChange={this.onChange}
                                            required="required" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <textarea
                                            name="address"
                                            id="address"
                                            className="form-control"
                                            placeholder="Address"
                                            value={address}
                                            onChange={this.onChange}
                                            required="required" />
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label htmlFor="gender">Gender&ensp;
                                        <select name="gender" id="gender" className="form-control" defaultValue={gender}>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div className="form-group col-6">
                                            <label htmlFor="bloodgroup">Blood Group</label>
                                            <input type="bloodgroup"
                                                name="bloodgroup"
                                                className="form-control"
                                                id="bloodgroup"
                                                placeholder="Blood Group"
                                                value={bloodgroup}
                                                onChange={this.onChange} />

                                            <label htmlFor="genotype">Genotype</label>
                                            <input type="genotype"
                                                name="genotype"
                                                className="form-control"
                                                id="genotype"
                                                placeholder="Genotype"
                                                value={genotype}
                                                onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date_of_birth">Date of Birth</label>
                                        <input type="date"
                                            name="date_of_birth"
                                            className="form-control"
                                            id="date_of_birth"
                                            value={date_of_birth}
                                            onChange={this.onChange}
                                            required="required" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone_number">Phone Number</label>
                                        <input type="number"
                                            name="phone_number"
                                            className="form-control"
                                            id="phone_number"
                                            placeholder="Phone Number"
                                            value={phone_number}
                                            onChange={this.onChange}
                                            required="required" />
                                    </div>
                                </div>

                                <div className="col-md-7 pt-4 shadow">
                                    <div className="row">
                                        <div className="col-12 pb-2 text-center">
                                            <p className="px-5 font-weight-bold text-center"> Which Health Challenge are you currently facing?</p>
                                        </div>
                                        <div className="form-group mx-auto">
                                            <label htmlFor="terminal_illness">Terminal &ensp;
                                        <select name="terminal_illness" id="terminal_illness" className="form-control" defaultValue={terminal_illness}>
                                                    <option>Cancer</option>
                                                    <option>Azemia</option>
                                                    <option>Parkinson</option>
                                                    <option>Diabetis</option>
                                                    <option>Arthritis</option>
                                                    <option>Others</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div className="form-group mx-auto">
                                            <label htmlFor="virial_dieseases">Viral&ensp;
                                        <select name="virial_dieseases" id="virial_dieseases" className="form-control" defaultValue={virial_dieseases}>
                                                    <option>Corona</option>
                                                    <option>Ebola</option>
                                                    <option>HIV</option>
                                                    <option>SmallPox</option>
                                                    <option>Influenza</option>
                                                    <option>Others</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div className="form-group mx-auto">
                                            <label htmlFor="Common_Illness">Common Illness&ensp;
                                        <select name="Common_Illness" id="Common_Illness" className="form-control" defaultValue={Common_Illness}>
                                                    <option>Malaria</option>
                                                    <option>Fever</option>
                                                    <option>Diarrhea</option>
                                                    <option>Common Cough</option>
                                                    <option>Cold</option>
                                                    <option>Food poisoning</option>
                                                    <option>Others</option>
                                                </select>
                                            </label>
                                        </div>
                                    </div>
                                    <center className="button-group">
                                        {image ?
                                            <img src={image} alt="image" id="default_image" />
                                            : ""
                                        }
                                        <main className="row pt-3 text-center table-responsive">
                                            <div id="vidstream" className="d-none">
                                                <center className="col-12 pb-1">
                                                    <span id="switchOn">
                                                        <p className="font-weight-bold h6">View Stream</p>
                                                        <video
                                                            ref="video"
                                                            autoPlay
                                                            id="video"
                                                            width="250"
                                                            height="300" />
                                                    </span>
                                                    <span id="switchOff">
                                                        <p className="font-weight-bold h6">Captured Image</p>
                                                        <canvas
                                                            ref="canvas"
                                                            id="canvas"
                                                            src={image}
                                                            width="250"
                                                            height="200" />
                                                        <input type="hidden" name="image" value={image} id="image" />
                                                        <div id="snapshot" className="img-responsive d-none"></div>

                                                    </span>
                                                </center>
                                            </div>
                                        </main>
                                        <button id="btn-start" type="button" className="btn btn-primary btn-sm" onClick={startStreaming}>Start Camera</button> &ensp;
                                    <button id="btn-capture" type="button" className="btn btn-success btn-sm" onClick={captureSnapshot}>Capture Image</button> &ensp;
                                    <button id="btn-stop" type="button" className="btn btn-danger btn-sm" onClick={stopStreaming}>Turn off Camera</button>
                                    </center>

                                    <div className="py-2 px-5 mx-5">
                                        <div className="text-center">
                                            <label htmlFor="affirmation" className="form-group pt-3">
                                                <input type="checkbox" required="required" id="affirmation" />
                                                &ensp; Terms of Aggreement
                                        </label>
                                        </div>
                                        {this.props.regdata !== undefined ?
                                            <button type="pmit" className="btn btn-outline-success btn-rounded btn-block my-1 waves-effect z-depth-0 setactive" > Update Data </button>
                                            :
                                            <button type="pmit" className="btn btn-outline-success btn-rounded btn-block my-1 waves-effect z-depth-0 setactive" > Save Data </button>
                                        }
                                        {this.props.regdata !== undefined ?
                                            <button type="button" className="btn btn-outline-danger btn-rounded btn-block" onClick={this.props.updateBtn}>Close Form</button>
                                            :
                                            <button type="button" className="btn btn-outline-danger btn-rounded btn-block" onClick={this.clearForm}>Reset From</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form >
            </div>
        )
    }
}
// The video stream
var cameraStream = null;
var toggleimage = document.getElementById("default_image")
// start stream
function startStreaming() {
    stopStreaming();
    if (toggleimage) {
        toggleimage.className = "d-none";
    }
    document.getElementById("canvas").className = 'd-block';
    document.getElementById("vidstream").className = "d-block";
    document.getElementById("switchOn").className = "d-block";
    document.getElementById("switchOff").className = "d-none";

    var mediaSupport = 'mediaDevices' in navigator;

    if (mediaSupport && null == cameraStream) {

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (mediaStream) {

                cameraStream = mediaStream;
                var stream = document.querySelector("video");
                stream.srcObject = mediaStream;

                stream.play();
            })
            .catch(function (err) {

                console.log("Unable to access camera: " + err);
            });
    }
    else {

        alert('Camera is already runing "just click CAPTURE" ');

        return;
    }
}


// Captutre
function captureSnapshot() {
    document.getElementById("switchOn").className = "d-none";
    document.getElementById("switchOff").className = "d-block";

    if (null != cameraStream) {
        var capture = document.getElementById("canvas");
        var stream = document.querySelector("video");
        var ctx = capture.getContext('2d');
        var img = new Image();

        ctx.drawImage(stream, 0, 0, capture.width, capture.height);

        img.src = capture.toDataURL("image/png");
        img.width = 240;
        var snapshot = document.getElementById("snapshot");
        snapshot.innerHTML = '';

        snapshot.appendChild(img);
        document.getElementById('image').value = img.src;
    }
}

// Stop Streaming
function stopStreaming() {
    document.getElementById("switchOn").className = "d-none";
    document.getElementById("switchOff").className = "d-block";
    if (null != cameraStream) {
        var track = cameraStream.getTracks()[0];
        var stream = document.querySelector("video");
        track.stop();
        stream.load();
        cameraStream = null;
    }
}


export default connect(null, { Register, updateRegister, createMessage })(RegForm);

