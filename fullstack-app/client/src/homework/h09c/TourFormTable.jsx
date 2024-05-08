import React, { useState } from "react";
import ToursTable from "./ToursTable";
import TourForm from "./TourForm";

function TourFormTable() {
    const [page, setPage] = useState("table");

    switch (page) {
        case "table":
            return <ToursTable goToForm={() => setPage("form")} />;
        case "form":
            return <TourForm returnToTable={() => setPage("table")} />;
        default:
            return <h1>404</h1>;
    }
}

export default TourFormTable;
