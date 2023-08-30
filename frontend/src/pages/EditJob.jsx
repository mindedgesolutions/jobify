import React from "react";
import { FormRow, FormRowSelect } from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/jobs/${params.id}`);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return redirect("/dashboard/jobs");
    }
};

export const action = async ({ request, params }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
        await customFetch.patch(`/jobs/${params.id}`, data)
        toast.success(`Job edited successfully`)
        return redirect("/dashboard/jobs");
    } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error)
        return redirect("/dashboard/jobs");
    }
};

const EditJob = () => {
    let job = useLoaderData();
    job = job.data
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">Edit job</h4>
                <div className="form-center">
                    <FormRow
                        inputType="text"
                        inputName="position"
                        inputId="position"
                        placeHolder="Enter position"
                        labelText="Enter position"
                        autoFocus="true"
                        required="true"
                        defaultValue={job.position}
                    />
                    <FormRow
                        inputType="text"
                        inputName="company"
                        inputId="company"
                        placeHolder="Enter company"
                        labelText="Enter company"
                        autoFocus="false"
                        required="true"
                        defaultValue={job.company}
                    />
                    <FormRow
                        inputType="text"
                        inputName="location"
                        labelText="Job location"
                        inputId="location"
                        placeHolder="Enter job location"
                        autoFocus="false"
                        required="true"
                        defaultValue={job.location}
                    />
                    <FormRowSelect
                        formLabel="Job status"
                        inputName="jobStatus"
                        inputId="jobStatus"
                        list={Object.values(JOB_STATUS)}
                        defaultValue={job.jobStatus}
                    />

                    <FormRowSelect
                        formLabel="Job type"
                        inputName="jobType"
                        inputId="jobType"
                        list={Object.values(JOB_TYPE)}
                        defaultValue={job.jobType}
                    />
                    <button
                        type="submit"
                        className="btn btn-block form-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing ..." : "Submit"}
                    </button>
                </div>
            </Form>
        </Wrapper>
    );
};

export default EditJob;
