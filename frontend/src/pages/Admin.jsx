import React from 'react'
import Wrapper from '../assets/wrappers/StatsContainer';
import { useLoaderData, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { StatItem } from '../assets/components';

export const loader = async () => {
    try {
        const response = await customFetch.get('/admin/stats')
        return response.data
    } catch (error) {
        toast.error(`You're not authorized to access this page`)
        return redirect('/dashboard')
    }
}

const Admin = () => {
    const { users, jobs } = useLoaderData()

    return (
        <Wrapper>
            <StatItem title='current users' count={users} color='#e9b949' bcg='#fcefc7' icon={<FaSuitcaseRolling />} />
            <StatItem title='total jobs' count={jobs} color='#647ace' bcg='#e0e8f9' icon={<FaCalendarCheck />} />
        </Wrapper>
    )
}

export default Admin
