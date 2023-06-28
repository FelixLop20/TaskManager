import React from "react";

export const Combobox = ({ to, lblContent, options,col, ...props }) => {
    return (
        <div className="col-12">
            <label className="form-label">{lblContent}</label>
            <select className="form-select" aria-label="" {
                ...props
            }>
                {options && options.map(option => (
                    <option key={option.id} value={option.id}>
                        {col === 'colab' ? option.nombre : option.descripcion}
                    </option>
                ))}
            </select>
        </div>

    )
}