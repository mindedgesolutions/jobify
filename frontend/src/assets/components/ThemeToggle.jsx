import React from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../wrappers/ThemeToggle";
import { useDashboardContext } from "../../pages/DashboardLayout";

const ThemeToggle = () => {
    const data = useDashboardContext();

    return (
        <Wrapper onClick={data.toggleDarkTheme}>
            {data.isDarkTheme ? (
                <BsFillSunFill className="toggle-icon" />
            ) : (
                <BsFillMoonFill className="toggle-icon" />
            )}
        </Wrapper>
    );
};

export default ThemeToggle;
