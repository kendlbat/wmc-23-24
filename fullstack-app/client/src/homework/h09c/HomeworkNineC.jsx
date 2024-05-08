import React, { useState } from "react";
import TourFormTable from "./TourFormTable";
import SchoolForm from "./SchoolForm";

function HomeworkNineC() {
    return (
        <>
            <h2>School Form</h2>
            <SchoolForm />
            <h2 className="mt-5 pt-5 border-top border-black">
                Tour Form & Table
            </h2>
            <TourFormTable />
        </>
    );
}

export default HomeworkNineC;
