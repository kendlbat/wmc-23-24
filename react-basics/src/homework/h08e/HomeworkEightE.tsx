import React from "react";
import BinaryCalc from "./Calc-and-Convert/BinaryCalc";
import InterestCalculator from "./Calc-and-Convert/InterestCalculator";
import GameSchedule from "./GameScheduler/GameSchedule";

const HomeworkEightE: React.FC = () => {
    return (
        <>
            <h2>BinaryCalc</h2>
            <BinaryCalc />
            <h2 className="mt-4">Interest Calculator</h2>
            <InterestCalculator />
            <h2 className="mt-4">Game Scheduler</h2>
            <GameSchedule />
        </>
    );
};

export default HomeworkEightE;
