import React from 'react'

const FormRowSelect = (props) => {
    return (
        <div className="form-row">
            <label htmlFor={props.inputName} className="form-label">{props.formLabel}</label>
            <select
                className="form-select"
                name={props.inputName}
                id={props.inputId}
                defaultValue={props.defaultValue ?? ''}
            >
                {props.list.map((itemValue) => {
                    return (
                        <option key={itemValue} value={itemValue}>
                            {itemValue.toUpperCase()}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}

export default FormRowSelect
