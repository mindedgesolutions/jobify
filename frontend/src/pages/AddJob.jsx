import React from "react";
import { FormRow, FormRowSelect } from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.post('/jobs', data)
        toast.success(`Job added successfully`)
        return redirect('jobs')
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error;
    }
}

const AddJob = () => {
    const { user } = useOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">Add job</h4>
                <div className="form-center">
                    <FormRow
                        inputType="text"
                        inputName="position"
                        inputId="position"
                        placeHolder="Enter position"
                        labelText="Enter position"
                        autoFocus="true"
                        required="true"
                    />
                    <FormRow
                        inputType="text"
                        inputName="company"
                        inputId="company"
                        placeHolder="Enter company"
                        labelText="Enter company"
                        autoFocus="false"
                        required="true"
                    />
                    <FormRow
                        inputType="text"
                        inputName="location"
                        labelText="Job location"
                        inputId="location"
                        placeHolder="Enter job location"
                        autoFocus="false"
                        required="true"
                        defaultValue={user.location}
                    />

                    <FormRowSelect
                        formLabel="Job status"
                        inputName="jobStatus"
                        inputId="jobStatus"
                        list={Object.values(JOB_STATUS)}
                        defaultValue={JOB_STATUS.PENDING}
                    />

                    <FormRowSelect
                        formLabel="Job type"
                        inputName="jobType"
                        inputId="jobType"
                        list={Object.values(JOB_TYPE)}
                        defaultValue={JOB_TYPE.FULL_TIME}
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

export default AddJob;
