import React from "react";
import { Button } from "./form/Button";
import PendingIcon from '../resources/pending.png'
import CompleteIcon from '../resources/complete.png'
import ProgressIcon from '../resources/progress.png'
import { AdminTasksAPI } from "../api/AdminTasksAPI"
import CancelIcon from '../resources/cancel.png'
import Like from '../resources/like.png'

export const ViewTaskModal = ({ closeViewTaskModal, setCloseViewTaskModal, selectedTask, setViewContent, setShow, setIcon }) => {

    const priorityContent = {
        1: 'Alta',
        2: 'Media',
        3: 'Baja',
    };
    const statesImgs = {
        1: <img className="states-icon" src={PendingIcon} alt="" />,
        2: <img className="states-icon" src={ProgressIcon} alt="" />,
        3: <img className="states-icon" src={CompleteIcon} alt="" />,
    };

    const changeState = async (task_id, estado_id) => {
        try {
            const body = { estado_id: estado_id };
            await AdminTasksAPI.put(`/tarea/estado/${task_id}`, body)
                .then(res => {
                    setCloseViewTaskModal(false);
                    setShow(true);
                    setIcon(Like);
                }).catch(error => {
                    setViewContent('Agrega un colaborador');
                    setShow(true);
                    setIcon(CancelIcon);
                })
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    }

    const eliminarTarea = (id) => {
        AdminTasksAPI.delete(`/tarea/eliminartarea/${id}`).then(res => {
            setCloseViewTaskModal(false);
            setShow(true);
        })
    };

    return (
        <>
            {
                closeViewTaskModal && <>
                    <div className="modal-task">
                        <div className="modal-container">
                            <div className="view-task">
                                <h3>{selectedTask.descripcion}</h3>
                                <hr />
                                <p>Encargado: {selectedTask.colaborador.nombre}</p>
                                <p>{selectedTask.notas}</p>
                                <p>Estado: {statesImgs[selectedTask.estado.id]} Prioridad: {priorityContent[selectedTask.prioridad.id]}</p>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    type={'button'}
                                    className={'btn btn-warning modal-btn'}
                                    content={'Cerrar'}
                                    onClick={() => setCloseViewTaskModal(false)} />

                                {selectedTask.estado.id === 1 && (
                                    <Button
                                        className={'btn btn-success modal-btn'}
                                        content={'Iniciar'}
                                        onClick={() => {
                                            changeState(selectedTask.id, 2);
                                            setViewContent('Tarea Iniciada');
                                        }} />

                                )}
                                {(selectedTask.estado.id === 1 || selectedTask.estado.id === 2) && (
                                    <Button
                                        className={'btn btn-danger modal-btn'}
                                        content={'Finalizar'}
                                        onClick={() => {
                                            changeState(selectedTask.id, 3);
                                            setViewContent('Tarea Completada');
                                        }
                                        } />
                                )}
                                {selectedTask.estado.id === 3 && (
                                    <Button
                                        className={'btn btn-danger modal-btn'}
                                        content={'Eliminar'}
                                        onClick={() => {
                                            eliminarTarea(selectedTask.id);
                                            setViewContent('Tarea Eliminada');
                                        }} />
                                )}
                            </div>
                        </div>
                    </div>

                </>
            }

        </>

    );
}