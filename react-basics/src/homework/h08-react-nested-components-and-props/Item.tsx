import React from "react";

const Item: React.FC<{ name: string; isPacked: boolean; id: number }> =
    function ({ name, isPacked, id }) {
        return (
            <li className="item">
                {id} - {name} {isPacked && "✔"}
            </li>
        );
    };

export default Item;
