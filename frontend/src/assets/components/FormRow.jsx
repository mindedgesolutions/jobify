import React from 'react'

const FormRow = (props) => {
    const required = props.required == 'true' ? true : false
    const autoFocus = props.autoFocus == 'true' ? true : false

    return (
        <div className="form-row">
            <label htmlFor="name" className='form-label'>{props.labelText}</label>
            <input
                className='form-input'
                type={props.inputType}
                name={props.inputName}
                id={props.inputId}
                placeholder={props.placeHolder}
                autoFocus={autoFocus}
                required={required}
                defaultValue={props.defaultValue} />
        </div>
    )
}

export default FormRow