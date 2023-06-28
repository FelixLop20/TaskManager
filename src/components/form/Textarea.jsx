import React from "react";

export const Textarea = ({lblContent, ...props }) => {
    return (
        <div className="col-12">
             <label  className="form-label">{lblContent}</label>
            <textarea
                className="form-control"
                style={{ resize: "none" }}
                {...props}
            />
        </div>

    )
}