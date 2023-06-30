import React from "react";
import Like from '../resources/like.png'
export const InfoView = ({ content }) => {
    return (
        <>
            <div className="pop-up">
                <div className="pop-up-content">
                    <p className="info-content">{content} <img className="OK" src={Like} alt="" /></p>
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