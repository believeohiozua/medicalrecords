import Search from 'react-search'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class SearchBar extends Component {

    HiItems(items) {
        var get_id = items[0]
        if (get_id !== undefined) {
            var item_pk = get_id.id
            localStorage.setItem('item_pk', item_pk);
        };
        {
            items.length > 0 ? items.map((searchedItem) => {
                return (
                    document.getElementById('searched_val').innerHTML = searchedItem.id + ": " + searchedItem.value
                )
            }) : null
        };
    }

    render() {
        const thelink = localStorage.getItem('item_pk')
        const { search_query } = this.props
        let dtnr = Object.assign(search_query.map((x) => ({ ['id']: x.pk, ['value']: x.owner })))
        let dtnr1 = Object.assign(search_query.map((x) => ({ ['id']: x.pk, ['value']: x.terminal_illness })))
        let dtnr2 = Object.assign(search_query.map((x) => ({ ['id']: x.pk, ['value']: x.virial_dieseases })))
        let dtnr3 = Object.assign(search_query.map((x) => ({ ['id']: x.pk, ['value']: x.Common_Illness })))
        return (
            <div>
                <div className="container">
                    <div className="row m-auto">
                        <div className="col-md-6">
                            <Search items={dtnr}
                                className='form-control'
                                placeholder='Search list'
                                maxSelected={3}
                                multiple={false}
                                onItemsChanged={this.HiItems.bind(this)} />

                        </div>
                        <div className="col-md-6 float-right">
                            <div className="h5 dropdown">
                                <span>&#8942;</span> Category Search
                                <div className="dropdown-content" id="dropcat">
                                    <Search items={dtnr1}
                                        className='form-control p-5'
                                        placeholder='Search Terminal Illness'
                                        maxSelected={3}
                                        multiple={false}
                                        onItemsChanged={this.HiItems.bind(this)} />
                                    <Search items={dtnr2}
                                        className='form-control p-5'
                                        placeholder='Search Viral Diseases'
                                        maxSelected={3}
                                        multiple={false}
                                        onItemsChanged={this.HiItems.bind(this)} />
                                    <Search items={dtnr3}
                                        className='form-control p-5'
                                        placeholder='Search Common illness'
                                        maxSelected={3}
                                        multiple={false}
                                        onItemsChanged={this.HiItems.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <center className="col-md-12">
                            <Link maintainScrollPosition={false}
                                to={{
                                    pathname: `/bio/${thelink}`,
                                    state: { fromDashboard: false }

                                }}>
                                <span className="color-link">
                                    <p id="searched_val"></p>
                                </span>
                            </Link>
                        </center>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    search_query: state.regdata_reducer.search_query,
});
export default connect(mapStateToProps, null)(SearchBar);
