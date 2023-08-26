import React from "react";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow } from "../assets/components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post("/auth/login", data);
        toast.success("Login successful");
        return redirect("/dashboard");
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error;
    }
};

const Login = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return (
        <Wrapper>
            <Form className="form" method="post">
                <Logo />
                <h4>Login page</h4>

                <FormRow
                    formLabel="Username"
                    inputType="email"
                    inputName="email"
                    inputId="email"
                    placeHolder="Enter email"
                    autoFocus="true"
                />

                <FormRow
                    formLabel="Password"
                    inputType="password"
                    inputName="password"
                    inputId="password"
                    placeHolder="Enter password"
                    autoFocus="false"
                />

                <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing ...' : 'Login'}
                </button>
                <button type="button" className="btn btn-block">
                    Explore the app
                </button>
                <p>
                    Not a member?
                    <Link to="/register" className="member-btn">
                        Register
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};

export default Login;
