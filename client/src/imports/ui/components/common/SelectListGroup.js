import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup =({
    name,
    value,
    err,
    info,
    onChange,
    options
})=> {
  const selectOptions = options.map(option =>(
      <option key={option.name} value={option._id}>
          {option.name}
      </option>
  ) )  
  return (
    <div className="form-group">
              <select    
              value={value} 
              onChange={onChange}
              className={classnames('form-control form-control-lg',
              {'is-invalid':err})} 
              name={name}
              >
                  <option value={''}>_</option>
                  {selectOptions}
              </select>
              {info && <small className ="form-text text-muted">{info}</small>}
              {err && (<div className="invalid-feedback">{err}</div>)}
    
    </div>
  )
}

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    err: PropTypes.string,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired,

};

export default SelectListGroup;

