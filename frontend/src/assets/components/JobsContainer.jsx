import React from 'react'
import Job from './Job'
import Wrapper from '../../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../../pages/AllJobs'

const JobsContainer = () => {
    const { data } = useAllJobsContext()
    const jobs = data.data

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h3>No jobs found</h3>
            </Wrapper>
        )
    }
    return (
        <Wrapper>

            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
        </Wrapper>
    )
}

export default JobsContainer
