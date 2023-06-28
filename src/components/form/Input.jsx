import React from "react";

export const Input = ({ divClassName, hidden, lblContent, to, ...props }) => {
    return (
        <div className={divClassName}
            hidden={hidden}>
            <label className="form-label">{lblContent}</label>
            <input className="form-control"
                {...props}
            />
        </div>

    )
}