import React from "react";

export const Header = ({ className, content }) => {
    return (
        <div className="app">
            <h1
                className={className}>
                {content}
            </h1>
        </div>

    );
};