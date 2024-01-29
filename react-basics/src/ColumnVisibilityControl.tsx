import React from "react";

const ColumnVisibilityControl: React.FunctionComponent<{
    columnsToShow: {
        showSchool: boolean;
        showHome: boolean;
        showComponent: boolean;
    };
    onColumnVisiblityChange: React.ChangeEventHandler<HTMLInputElement>;
}> = function ({ columnsToShow, onColumnVisiblityChange }) {
    return (
        <div
            className="btn-group"
            role="group"
            aria-label="Button group visualization-control">
            <input
                type="checkbox"
                className="btn-check"
                id="showSchool"
                autoComplete="off"
                checked={columnsToShow["showSchool"]}
                onChange={onColumnVisiblityChange}
            />
            <label className="btn btn-outline-warning" htmlFor="showSchool">
                School
            </label>

            <input
                type="checkbox"
                className="btn-check"
                id="showHome"
                autoComplete="off"
                checked={columnsToShow["showHome"]}
                onChange={onColumnVisiblityChange}
            />
            <label className="btn btn-outline-warning" htmlFor="showHome">
                Home
            </label>

            <input
                type="checkbox"
                className="btn-check"
                id="showComponent"
                autoComplete="off"
                checked={columnsToShow["showComponent"]}
                onChange={onColumnVisiblityChange}
            />
            <label className="btn btn-outline-warning" htmlFor="showComponent">
                Component
            </label>
        </div>
    );
};

export default ColumnVisibilityControl;
