import React from "react";
import TextStats from "./TextStats";
import VATCalc from "./VATCalc";

const HomeworkEightC: React.FC = () => {
    return (
        <>
            <h2>Text Stats</h2>
            <TextStats />
            <h2 className="mt-4">VAT Calculator</h2>
            <VATCalc vatRates={[0, 6.5, 20, 33]} />
        </>
    );
};

export default HomeworkEightC;
