import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PieChartWithCustomization from "./PieChartWithCustomization"
import ColumnChart from "./ColumnChart";
import BarChart from "./BarChart"

export class Metric extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="h6 dropdown  float-right">
                            <span>&#8942;</span> Browse Categories
                        <div className="dropdown-content py-2 px-3 h6">
                                <Link to={"/catmetrics"}
                                    className="btn-outline-info btn-xs">
                                    <small className="">Malaria</small>
                                </Link>
                                <Link to={"/catmetrics"}
                                    className="btn-outline-info btn-xs">
                                    <small className="">Fever</small>
                                </Link>
                                <Link to={"/catmetrics"}
                                    className="btn-outline-info btn-xs">
                                    <small className="">Diarrhea</small>
                                </Link>
                                <Link to={"/catmetrics"}
                                    className="btn-outline-info btn-xs">
                                    <small className="">Common</small>
                                </Link>
                                <Link to={"/catmetrics"}
                                    className="btn-outline-info btn-xs">
                                    <small className="">Cold</small>
                                </Link>
                                <Link to={"/catmetrics"}
                                    className="btn-outline-info btn-xs">
                                    <small className="">Food</small>
                                </Link>

                            </div>
                        </div>
                    </div>


                    <div className="col-md-12 p-5">
                        <ColumnChart />

                    </div>
                    <div className="col-md-6 mx-auto p-2">
                        <PieChartWithCustomization />
                    </div>
                    <div className="col-md-6 mx-auto p-2">
                        <BarChart />
                    </div>


                </div>
            </div>
        )
    }
}


export default Metric
