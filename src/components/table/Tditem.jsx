import React from "react";

export const Tditem = ({ props, onClick, className }) => {
    return (
        <td className={className} onClick={onClick}>{props}</td>
    );
}