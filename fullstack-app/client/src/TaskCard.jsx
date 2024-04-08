import { PropTypes } from "prop-types";

export default function TaskCard({ task, onClick }) {
    return (
        <div className="card " onClick={() => onClick(task)}>
            <div className="card-body p-2">
                <h6 className="card-title">{task.title}</h6>
                <p className="card-text">
                    <small>{task.desc}</small>
                </p>
            </div>
        </div>
    );
}

// https://www.freecodecamp.org/news/how-to-use-proptypes-in-react/
TaskCard.propTypes = {
    task: PropTypes.object,
    onClick: PropTypes.func,
};
