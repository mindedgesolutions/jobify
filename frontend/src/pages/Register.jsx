import React from "react";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import Logo from "../assets/components/Logo";
import { FormRow } from "../assets/components";
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/register', data)
        toast.success('Registration successful')
        return redirect('/login');
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
        return error;
    }
};

const Register = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return (
        <Wrapper>
            <Form className="form" method="post">
                <Logo />
                <h4>Register</h4>
                <FormRow
                    formLabel="First name"
                    inputType="text"
                    inputName="name"
                    inputId="name"
                    placeHolder="Enter first name"
                    autoFocus="true"
                />

                <FormRow
                    formLabel="Last name"
                    inputType="text"
                    inputName="lastName"
                    inputId="lastName"
                    placeHolder="Enter last name"
                    autoFocus="false"
                />

                <FormRow
                    formLabel="Email"
                    inputType="email"
                    inputName="email"
                    inputId="email"
                    placeHolder="Enter email"
                    autoFocus="false"
                />

                <FormRow
                    formLabel="Location"
                    inputType="text"
                    inputName="location"
                    inputId="location"
                    placeHolder="Enter location"
                    autoFocus="false"
                />

                <FormRow
                    formLabel="Password"
                    inputType="password"
                    inputName="password"
                    inputId="password"
                    placeHolder="Enter password"
                    autoFocus="false"
                />

                <FormRow
                    formLabel="Confirm password"
                    inputType="password"
                    inputName="confirmPassword"
                    inputId="confirmPassword"
                    placeHolder="Confirm password"
                    autoFocus="false"
                />

                <button type="submit" className="btn btn-block" disabled={isSubmitting} >
                    {isSubmitting ? 'Processing ...' : 'Submit'}
                </button>
                <p>
                    Already a member?
                    <Link to="/login" className="member-btn">
                        Login
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};

export default Register;
