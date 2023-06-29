import React from "react";

export const Tditem = ({ props, onClick }) => {
    return (
        <td onClick={onClick}>{props}</td>
    );
}