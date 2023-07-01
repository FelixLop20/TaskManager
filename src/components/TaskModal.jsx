import React, { useState, useEffect } from "react";

import { Input } from "./form/Input";
import { Textarea } from "./form/Textarea";
import { Combobox } from "./form/Combobox";
import { Button } from "./form/Button";

import EditIcon from '../resources/edit-icon.png';
import AddIcon from '../resources/Add.png';
import Like from '../resources/like.png';
import CancelIcon from '../resources/cancel.png';

import {
    readColaboratos,
    readPriorities,
    readStates,
    createTask,
    editTask
} from "../api/AdminTasksAPI";

export const TaskModal = ({
    openTaskModal,
    setOpenTaskModal,
    task,
    isEditing,
    setIsEditing,
    setShowPopup,
    setViewContent,
    setIcon
}) => {

    const [colaborators, setColaborators] = useState([]);
    const [states, setStates] = useState([]);
    const [priority, setPriority] = useState([]);
    const date = new Date();
    const dateNow = date.toISOString().split('T')[0];
    const [taskAttributes, setTaskAttributes] = useState([]);

    //Limpiar los campos
    const cleanFields = {
        id: null,
        descripcion: '',
        estado: 1,
        prioridad: 1,
        fecha_inicio: dateNow,
        fecha_fin: dateNow,
        colaborador: 1,
        notas: ''
    }

    //body que se manda a los requests del API
    const body = {
        descripcion: taskAttributes.descripcion,
        estado_id: taskAttributes.estado,
        prioridad_id: taskAttributes.prioridad,
        fecha_inicio: taskAttributes.fecha_inicio,
        fecha_fin: taskAttributes.fecha_fin,
        colab_id: taskAttributes.colaborador,
        notas: taskAttributes.notas
    };

    //llenar los campos si se está editando
    const data = {
        id: task?.id,
        descripcion: task?.descripcion || '',
        estado: task?.estado?.id || 1,
        prioridad: task?.prioridad?.id || 1,
        fecha_inicio: task?.fecha_inicio || dateNow,
        fecha_fin: task?.fecha_fin || dateNow,
        colaborador: task?.colaborador?.id || 1,
        notas: task?.notas || ''
    };

    const handleEditAndCreate = (res) => {
        setShowPopup(true)
        setOpenTaskModal(false)
        setViewContent(res);
        setIcon(Like);
        setTaskAttributes(cleanFields);
    };

    //capturar los valores de los inputs, combobox 
    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'fecha_inicio' && !isEditing) {
            setTaskAttributes(prevState => ({
                ...prevState,
                fecha_inicio: value,
                fecha_fin: value
            }));
        } else {
            setTaskAttributes(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const cTask = () => {
        try {
            createTask(body)
                .then(res => {
                    handleEditAndCreate(res);
                }).catch(error => {
                    alert(error.message);
                })
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        };
    };

    const eTask = async () => {
        try {
            editTask(taskAttributes.id, body)
                .then(res => {
                    handleEditAndCreate(res);
                }).catch(error => {
                    setIcon(CancelIcon);
                    setViewContent(error.message);
                    setShowPopup(true);
                })
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        };
    };

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

    useEffect(() => {
        setTaskAttributes(data);
        // eslint-disable-next-line
    }, [task]);

//Cerrar el Modal con Escape
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpenTaskModal(false);
                setIsEditing(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {
                openTaskModal && <>
                    {
                        <div className="modal-task">

                            <div className="modal-container">
                                <form className="row g-3" onSubmit={ev => {
                                    ev.preventDefault();
                                    isEditing ? eTask() : cTask();
                                }}>
                                    {
                                        <h3>{
                                            isEditing
                                                ? <>Editar Tarea <img
                                                    className="actions-icon"
                                                    src={EditIcon} alt="" /></>
                                                : <>Crear Tarea <img
                                                    className="actions-icon"
                                                    src={AddIcon} alt="" /></>}</h3>
                                    }
                                    {
                                        isEditing && <Input
                                            divClassName={'col-md-12'}
                                            type={'text'}
                                            id={'id'}
                                            name={'id'}
                                            hidden={true}
                                            onChange={handleChange}
                                            value={taskAttributes.id ?? ''}
                                        />
                                    }
                                    <Input
                                        divClassName={'col-md-12'}
                                        type={'text'}
                                        id={'descripcion'}
                                        name={'descripcion'}
                                        placeholder={'Descripcion de la tarea'}
                                        required={true}
                                        lblContent={'Tarea:'}
                                        onChange={handleChange}
                                        value={taskAttributes.descripcion}
                                    />
                                    <Combobox
                                        lblContent={'Estado:'}
                                        options={!isEditing ? states.slice(0, 1) : states}
                                        id={'estado'}
                                        name={'estado'}
                                        onChange={e => handleChange(e)}
                                        value={taskAttributes.estado}
                                    />
                                    <Combobox
                                        options={priority}
                                        lblContent={'Prioridad'}
                                        id={'prioridad'}
                                        name={'prioridad'}
                                        onChange={e => handleChange(e)}
                                        value={taskAttributes.prioridad}
                                    />
                                    <Input
                                        divClassName={'col-md-6'}
                                        type={'date'}
                                        id={'fecha_inicio'}
                                        name={'fecha_inicio'}
                                        required={true}
                                        lblContent={'Fecha de Inicio:'}
                                        onChange={e => handleChange(e)}
                                        min={!isEditing ? dateNow : ''}
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
                                        min={taskAttributes.fecha_inicio}
                                        value={taskAttributes.fecha_fin}
                                        className={'form-control date-input-icon'}
                                    />
                                    <Combobox
                                        options={colaborators}
                                        lblContent={'Colaborador:'}
                                        id={'colaborador'}
                                        col={'colab'}
                                        name={'colaborador'}
                                        onChange={e => handleChange(e)}
                                        value={taskAttributes.colaborador}
                                    />
                                    <Textarea
                                        cols={'30'}
                                        rows={'5'}
                                        placeholder={'Notas Adicionales'}
                                        lblContent={'Notas: '}
                                        id={'notas'}
                                        name={'notas'}
                                        onChange={handleChange}
                                        value={taskAttributes.notas}
                                    />
                                    <div className="modal-footer">
                                        <Button
                                            type={'button'}
                                            className={'btn btn-warning modal-btn'}
                                            content={'Cerrar'}
                                            onClick={() => {
                                                setOpenTaskModal(false);
                                                setIsEditing(false);
                                                setTaskAttributes(cleanFields);
                                            }} />

                                        <Button
                                            className={'btn btn-success modal-btn'}
                                            content={'Guardar'} />
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