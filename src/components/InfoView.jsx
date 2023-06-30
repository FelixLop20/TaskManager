import React from "react";
export const InfoView = ({ content, Icon }) => {
    return (
        <>
            <div className="pop-up">
                <div className="pop-up-content">
                    <p className="info-content">{content} <img className="OK" src={Icon} alt="" /></p>
                    <div className="progress-bar"></div>
                </div>
            </div>


            <style>
                {
                    `.OK{
                width:30px;
            }
            `
                }
            </style>
        </>
    )
}