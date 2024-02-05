import React from "react";
import Item from "./Item";

const PackingList: React.FC<{
    items: { name: string; isPacked: boolean; id: number }[];
}> = function ({ items }) {
    return (
        <section>
            <h1>Sally Ride&apos;s Packing List</h1>
            <ul>
                {items.map((i) => (
                    <Item key={i.id} {...i}></Item>
                ))}
            </ul>
        </section>
    );
};

export default PackingList;
