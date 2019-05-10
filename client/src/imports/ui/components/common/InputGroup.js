import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup =({
    name,
    placeholder,
    value,
    err,
    onChange,
    icon,
    type,
    disabled
})=> {
  return (
    <div className="input-group mb-3">
    <div className="input-group-prepend">
        <span className="input-group-text">
            <i className={icon}/>
        </span>
    </div>
             <input 
              type={type}
              value={value} 
              onChange={onChange}
              className={classnames('form-control form-control-lg',
              {'is-invalid':err})} 
              placeholder={placeholder}
              name={name} 
              disabled={disabled}    
              />
             {err && (<div className="invalid-feedback">{err}</div>)}
    
    </div>
  )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    err: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    icon: PropTypes.string,


};
InputGroup.defaultProps ={
    type: 'text'
};
export default InputGroup;
