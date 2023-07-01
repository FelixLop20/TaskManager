import React from "react";

import { useEffect, useState } from "react";
import { Button } from "./form/Button";
import { Combobox } from "./form/Combobox";
import { Input } from "./form/Input";

import FilterIcon from '../resources/filter.png'

import {
    readColaboratos,
    readPriorities,
    readStates,
} from "../api/AdminTasksAPI";


export const FilterModal = ({
    openFilterModal,
    setOpenFilterModal,
    setIsFiltering,
    setBodyFilter
}) => {


    const [colaborators, setColaborators] = useState([]);
    const [states, setStates] = useState([]);
    const [priority, setPriority] = useState([]);
    const [showDates, setshowDates] = useState(false);

    const date = new Date();
    const dateNow = date.toISOString().split('T')[0];

    const [taskAttributes, setTaskAttributes] = useState({
        estado: '',
        prioridad: '',
        fecha_inicio: dateNow,
        fecha_fin: dateNow,
        colaborador: '',
    });

    const body = {
        estado_id: taskAttributes.estado,
        prioridad_id: taskAttributes.prioridad,
        fecha_inicio: showDates ? taskAttributes.fecha_inicio : null,
        fecha_fin: showDates ? taskAttributes.fecha_fin : null,
        colab_id: taskAttributes.colaborador,
    };

    //capturar todas las promesa
    useEffect(() => {
        Promise.all([readColaboratos(), readPriorities(), readStates()])
            .then(([colabs, priorities, states]) => {
                setColaborators(colabs);
                setPriority(priorities);
                setStates(states);
            })
            .catch(error => {
                alert(error.message);
            });
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setTaskAttributes(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const TaskFilter = () => {
        setBodyFilter(body);
        setIsFiltering(
            taskAttributes.estado !== '' ||
            taskAttributes.colaborador !== '' ||
            taskAttributes.prioridad !== '' ||
            showDates
        )
        setOpenFilterModal(false);
    }

    const handleCheckboxChange = (event) => {
        setshowDates(event.target.checked);
    };

    return (
        <>
            {
                openFilterModal &&
                <div className="modal-task">
                    <div className="modal-container">
                        <form className="row g-3" onSubmit={ev => {
                            ev.preventDefault();
                            TaskFilter();
                        }}>
                            <h3>Filtrar
                                <img
                                    className="actions-icon"
                                    src={FilterIcon} alt="" />
                            </h3>
                            <Combobox
                                options={colaborators}
                                lblContent={'Colaborador:'}
                                id={'colaborador'}
                                col={'colab'}
                                name={'colaborador'}
                                onChange={e => handleChange(e)}
                                value={taskAttributes.colaborador}
                                extOption={'Todos'}
                            />
                            <Combobox
                                lblContent={'Estado:'}
                                options={states}
                                id={'estado'}
                                name={'estado'}
                                onChange={e => handleChange(e)}
                                value={taskAttributes.estado}
                                extOption={'Todos'}
                            />
                            <Combobox
                                options={priority}
                                lblContent={'Prioridad'}
                                id={'prioridad'}
                                name={'prioridad'}
                                onChange={e => handleChange(e)}
                                extOption={'Todos'}
                                value={taskAttributes.prioridad}
                            />
                            <div className="checkBox-container">
                                <input
                                    className={''}
                                    type="checkbox"
                                    id="checkboxFechas"
                                    checked={showDates}
                                    onChange={handleCheckboxChange}
                                />
                                <span>
                                    Rango de Fechas
                                </span>
                            </div>
                            {
                                showDates && <>

                                    <Input
                                        divClassName={'col-md-6'}
                                        type={'date'}
                                        id={'fecha_inicio'}
                                        name={'fecha_inicio'}
                                        required={true}
                                        lblContent={'Fecha de Inicio:'}
                                        onChange={e => handleChange(e)}
                                        value={taskAttributes.fecha_inicio}
                                        className={'form-control date-input-icon'}
                                    />
                                    <Input
                                        divClassName={'col-md-6'}
                                        type={'date'}
                                        id={'fecha_fin'}
                                        name={'fecha_fin'}
                                        required={true}
                                        lblContent={'Fecha de Finalización:'}
                                        onChange={handleChange}
                                        value={taskAttributes.fecha_fin}
                                        className={'form-control date-input-icon'}
                                    />
                                </>
                            }

                            <div className="modal-footer">
                                <Button
                                    type={'button'}
                                    className={'btn btn-warning modal-btn'}
                                    content={'Cerrar'}
                                    onClick={() => setOpenFilterModal(false)} />

                                <Button
                                    className={'btn btn-success modal-btn'}
                                    content={'Buscar'} />
                            </div>
                        </form>
                    </div>

                </div>
            }

        </>
    );
}