import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup =({
    name,
    placeholder,
    value,
    err,
    info,
    onChange
})=> {
  return (
    <div className="form-group">
              <textarea    
              value={value} 
              onChange={onChange}
              className={classnames('form-control form-control-lg',
              {'is-invalid':err})} 
              placeholder={placeholder}
              name={name} 
              />
              {info && <small className ="form-text text-muted">{info}</small>}
              {err && (<div className="invalid-feedback">{err}</div>)}
    
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    err: PropTypes.string,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired,

};

export default TextAreaFieldGroup;
