import React, { Component } from 'react'

 class Categories extends Component {
    render() {
        return (
            <div className="col-md-3">
            <div className="d-none d-md-block">
                <div className="filters">
                    <div className="filter-item">
                        <h3>Categories</h3>
                        <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-1"/><label className="form-check-label" htmlFor="formCheck-1">Phones</label></div>
                        <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-2"/><label className="form-check-label" htmlFor="formCheck-2">Laptops</label></div>
                        <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-3"/><label className="form-check-label" htmlFor="formCheck-3">PC</label></div>
                        <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-4"/><label className="form-check-label" htmlFor="formCheck-4">Tablets</label></div>
                    </div>
               
                </div>
            </div>
            <div className="d-md-none"><a className="btn btn-link d-md-none filter-collapse" data-toggle="collapse" aria-expanded="false" aria-controls="filters" href="#filters" role="button">Filters<i className="icon-arrow-down filter-caret"></i></a>
                <div className="collapse"
                    id="filters">
                    <div className="filters">
                        <div className="filter-item">
                            <h3>Categories</h3>
                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-1"/><label className="form-check-label" htmlFor="formCheck-1">Phones</label></div>
                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-2"/><label className="form-check-label" htmlFor="formCheck-2">Laptops</label></div>
                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-3"/><label className="form-check-label" htmlFor="formCheck-3">PC</label></div>
                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-4"/><label className="form-check-label" htmlFor="formCheck-4">Tablets</label></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Categories