import React, { useState, useEffect } from "react";
import { Input } from "./form/Input";
import { Combobox } from "./form/Combobox";
import { AdminTasksAPI } from "../api/AdminTasksAPI";
import { Button } from "./form/Button";

export const FilterModal = ({ closeFiltro, setCloseFiltro, tarea, ...props }) => {

    const date = new Date();
    const dateNow = date.toISOString().split('T')[0];

    const [colaboradores, setColaboradores] = useState([]);

    //estado
    const opsEstado = [
        { id: 1, nombre: "Pendiente" },
        { id: 2, nombre: "En Proceso" },
        { id: 3, nombre: "Finalizada" }
    ];

    //llenar combobox de prioridad
    const opsPrioridad = [
        { id: 1, nombre: "Alta" },
        { id: 2, nombre: "Media" },
        { id: 3, nombre: "Baja" }

    ];

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setCloseFiltro(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        AdminTasksAPI.get('/colaborador/colaboradores')
            .then(resp => {
                setColaboradores(resp.data.data);
            });
    }, []);

    return (
        <>
            {
                closeFiltro && <>
                    {
                        <div {...props} className="Modal_t">
                            <div className="modal-container">
                                <form className="row g-3" onSubmit={ev => {
                                    ev.preventDefault();
                                }}>
                                    <Combobox
                                        lblContent={'Estado:'}
                                        options={opsEstado}
                                        id={'estado'}
                                        name={'estado'}
                                    />
                                    <Combobox
                                        options={opsPrioridad}
                                        lblContent={'Prioridad'}
                                        id={'prioridad'}
                                        name={'prioridad'}

                                    />
                                    <Input
                                        divClassName={'col-md-6'}
                                        type={'date'}
                                        id={'fecha_inicio'}
                                        name={'fecha_inicio'}
                                        required={true}
                                        lblContent={'Fecha de Inicio:'}
                                        min={dateNow}

                                    />
                                    <Input
                                        divClassName={'col-md-6'}
                                        type={'date'}
                                        id={'fecha_fin'}
                                        name={'fecha_fin'}
                                        required={true}
                                        lblContent={'Fecha de Finalización:'}
                                    />
                                    <Combobox
                                        options={colaboradores}
                                        lblContent={'Colaborador:'}
                                        id={'colaborador'}
                                        name={'colaborador'}
                                    />
                                    <div className="modal_footer">
                                        <Button
                                            type={'button'}
                                            className={'btn btn-secondary m_btn'}
                                            content={'X'}
                                            onClick={() => setCloseFiltro(false)} />
                                        <Button
                                            className={'btn btn-primary m_btn'}
                                            content={'Todos'} />
                                        <Button
                                            className={'btn btn-primary m_btn'}
                                            content={'Filtrar'} />
                                    </div>
                                </form>
                            </div>
                        </div>

                    }
                </>

            }
        </>

    );
};