import React from "react";

export const Header = ({ content, ...props }) => {
    return (
        <div className="app">
            <h1
                {...props}>
                {content}
            </h1>
        </div>

    );
};