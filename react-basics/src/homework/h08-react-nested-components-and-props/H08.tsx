import React from "react";
import PackingList from "./PackingList";

const H08: React.FunctionComponent<{}> = function () {
    return (
        <PackingList
            items={[
                {
                    id: 1,
                    isPacked: true,
                    name: "Space Helmet",
                },
                {
                    id: 2,
                    isPacked: false,
                    name: "Beer",
                },
                {
                    id: 3,
                    isPacked: true,
                    name: "TypeScript",
                },
            ]}
        />
    );
};

export default H08;
