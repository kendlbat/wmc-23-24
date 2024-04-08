import PropTypes from "prop-types";

export default function ColumnVisibilityControl({
    columnsToShow,
    onColumnVisiblityChange,
}) {
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
}

ColumnVisibilityControl.propTypes = {
    columnsToShow: PropTypes.object.isRequired,
    onColumnVisiblityChange: PropTypes.func.isRequired,
};
