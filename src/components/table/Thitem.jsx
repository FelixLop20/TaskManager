import React from "react";

export const Thitem = ({ props, className }) => {
    return (
        <th className={className}>{props}</th>
    );
}