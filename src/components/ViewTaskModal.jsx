import React from "react";
import { Button } from "./form/Button";
import PendingIcon from '../resources/pending.png'
import CompleteIcon from '../resources/complete.png'
import ProgressIcon from '../resources/progress.png'

export const ViewTaskModal = ({ closeViewTaskModal, setCloseViewTaskModal, selectedTask }) => {

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
                                    <Button className={'btn btn-success modal-btn'} content={'Iniciar'} />
                                )}
                                {(selectedTask.estado.id === 1 || selectedTask.estado.id === 2) && (
                                    <Button className={'btn btn-danger modal-btn'} content={'Finalizar'} />
                                )}
                                {selectedTask.estado.id === 3 && (
                                    <Button className={'btn btn-danger modal-btn'} content={'Eliminar'} />
                                )}
                            </div>
                        </div>
                    </div>

                </>
            }

        </>

    );
}