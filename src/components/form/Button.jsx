import React from "react";

export const Button = ({ content, ...props }) => {
    return (
        <button
            {...props}
        >
            {content}
        </button>
    );
}