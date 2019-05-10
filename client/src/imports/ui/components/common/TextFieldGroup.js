import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup =({
    name,
    placeholder,
    value,
    label,
    err,
    info,
    type,
    onChange,
    disabled
})=> {
  return (
    <div className="form-group">
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
              {info && <small className ="form-text text-muted">{info}</small>}
              {err && (<div className="invalid-feedback">{err}</div>)}
    
    </div>
  )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    err: PropTypes.string,
    info: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
};
TextFieldGroup.defaultProps ={
    type: 'text'
};
export default TextFieldGroup;
