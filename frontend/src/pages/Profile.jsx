import React from "react";
import { FormRow } from "../assets/components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { useNavigation, Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData()
    const file = formData.get('avatar')
    if (file && file.size > 500000){
        toast.error(`Image size too large`)
        return null
    }
    try {
        await customFetch.patch('/info/update', formData)
        toast.success(`Profile updated successfully`)
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    return null;
}

const Profile = () => {
    const user = useOutletContext();
    const { name, lastName, email, location } = user.user;
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    return (
        <Wrapper>
            <Form method="post" className="form" encType="multipart/form-data">
                <h4 className="form-title">Profile</h4>
                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="avatar" className="form-label">
                            Select an image file (max 0.5 MB)
                        </label>
                        <input
                            className="form-input"
                            type="file"
                            name="avatar"
                            id="avatar"
                            accept="image/*"
                        />
                    </div>
                    <FormRow
                        inputType="text"
                        inputName="name"
                        inputId="name"
                        placeholder="Enter name"
                        autoFocus="true"
                        required="true"
                        defaultValue={name}
                        labelText="Name"
                    />
                    <FormRow
                        inputType="text"
                        inputName="lastName"
                        inputId="lastName"
                        placeholder="Enter last name"
                        autoFocus="false"
                        required="true"
                        defaultValue={lastName}
                        labelText="Last Name"
                    />
                    <FormRow
                        inputType="text"
                        inputName="email"
                        inputId="email"
                        placeholder="Enter email"
                        autoFocus="false"
                        required="true"
                        defaultValue={email}
                        labelText="Email"
                    />
                    <FormRow
                        inputType="text"
                        inputName="location"
                        inputId="location"
                        placeholder="Enter location"
                        autoFocus="false"
                        required="true"
                        defaultValue={location}
                        labelText="Location"
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

export default Profile;
