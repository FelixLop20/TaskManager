import React, { useState, useEffect } from "react";
import { Input } from "./form/Input";
import { Textarea } from "./form/Textarea";
import { Combobox } from "./form/Combobox";
import { AdminTasksAPI } from "../api/AdminTasksAPI";
import { Button } from "./form/Button";
import EditIcon from '../resources/edit-icon.png'
import AddIcon from '../resources/Add.png'


export const TaskModal = ({ closeModal, setCloseModal, task, isEditing, setIsEditing }) => {

    const [colaborators, setColaborators] = useState([]);
    const [states, setStates] = useState([]);
    const [priority, setPriority] = useState([]);
    const date = new Date();
    const dateNow = date.toISOString().split('T')[0];

    const [taskAttributes, setTaskAttributes] = useState([]);

    useEffect(() => {
        AdminTasksAPI.get('/colaborador/colaboradores')
            .then(resp => {
                setColaborators(resp.data.data);
            });
        AdminTasksAPI.get('/estado/estados')
            .then(resp => {
                setStates(resp.data.data);
            });
        AdminTasksAPI.get('/prioridad/prioridades')
            .then(resp => {
                setPriority(resp.data.data);
            });
    }, []);


    useEffect(() => {
        if (isEditing) {
            const data = {
                id: task.id,
                descripcion: task.descripcion,
                estado: task.estado.id,
                prioridad: task.prioridad.id,
                fecha_inicio: task.fecha_inicio,
                fecha_fin: task.fecha_fin,
                colaborador: task.colaborador.id,
                notas: task.notas || ''
            }
            setTaskAttributes(data)

        } else if (!isEditing) {
            setTaskAttributes({
                descripcion: '',
                estado: 1,
                prioridad: 1,
                fecha_inicio: dateNow,
                fecha_fin: dateNow,
                colaborador: 1,
                notas: ''
            });
        }

    }, [task, isEditing]);

    const body = {

        descripcion: taskAttributes.descripcion,
        estado_id: taskAttributes.estado,
        prioridad_id: taskAttributes.prioridad,
        fecha_inicio: taskAttributes.fecha_inicio,
        fecha_fin: taskAttributes.fecha_fin,
        colab_id: taskAttributes.colaborador,
        notas: taskAttributes.notas
    };

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'fecha_inicio') {
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

    const createTask = () => {
        try {
            AdminTasksAPI.post('/tarea/creartarea', body)
                .then(res => {
                    console.log(res.data.message);
                    setCloseModal(false);
                })
                .catch(error => {
                    console.error('Error al crear la tarea:', error);
                });
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const editTask = () => {
        try {
            AdminTasksAPI.put(`/tarea/editartarea/${taskAttributes.id}`, body)
                .then(res => {
                    console.log(res.data.message);
                    setCloseModal(false);
                })
                .catch(error => {
                    console.error('Error al editar la tarea:', error);
                });
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setCloseModal(false);
                setIsEditing(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            {
                closeModal && <>
                    {
                        <div className="modal-task">
                            <div className="modal-container">
                                <form className="row g-3" onSubmit={ev => {
                                    ev.preventDefault();
                                    isEditing ? editTask() : createTask();
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
                                        options={states}
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
                                        min={dateNow}
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
                                            onClick={() => { setCloseModal(false); setIsEditing(false) }} />

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