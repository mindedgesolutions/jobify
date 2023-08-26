import React from 'react'
import Wrapper from '../wrappers/JobInfo'

const JobInfo = (props) => {
    return (
        <Wrapper>
            <span className="job-icon">{props.icon}</span>
            <span className="job-text">{props.text}</span>
        </Wrapper>
    )
}

export default JobInfo