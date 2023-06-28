import React from "react";
import { Header } from "../components/Header";
import { Tditem } from "../components/table/Tditem";
import { Button } from "../components/form/Button";
import { TaskModal } from "../components/TaskModal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminTasksAPI } from "../api/AdminTasksAPI";
import { Thead } from "../components/table/Thead";
import { Thitem } from "../components/table/Thitem";
import DeleteIcon from '../resources/delete-icon.png'
import EditIcon from '../resources/edit-icon.png'
import PendingIcon from '../resources/pending.png'
import CompleteIcon from '../resources/complete.png'
import ProgressIcon from '../resources/progress.png'
import TaskIcon from '../resources/task.png'
import AddIcon from '../resources/Add.png'
import FilterIcon from '../resources/filter.png'

export const Home = () => {

    const [tasks, setTasks] = useState([]);
    const [closeModal, setCloseModal] = useState(false);
    const [editTask, setEditTask] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const obtenertasks = () => {
        AdminTasksAPI.get('/tarea/tareas')
            .then(resp => {
                setTasks(resp.data.data);
                console.log(resp.data.data);
            });

    };
    const eliminarTarea = (id) => {
        AdminTasksAPI.delete(`/tarea/eliminartarea/${id}`).then(res => {
            console.log(res.data.data);
            obtenertasks();
        })
    };

    useEffect(() => {
        obtenertasks();
    }, [closeModal]);


    const statesContent = {
        1: (className) => <img className={className} src={PendingIcon} alt="" />,
        2: (className) => <img className={className} src={ProgressIcon} alt="" />,
        3: (className) => <img className={className} src={CompleteIcon} alt="" />,
      };
      
    return (
        <>
            <div className="container">
                <Header
                    className={'main-title'}
                    content={<>Administador de Tareas <img className="icon-title" src={TaskIcon} alt="" /></>}
                />
                <div className="options-content">
                    <div className="button-content">
                        <Button
                            type={'button'}
                            className={'btn btn-danger add-button'}
                            content={<>Crear Tarea<img className="states-icon" src={AddIcon} alt="" /></>}
                            style={{ margin: '5px' }}
                            onClick={() => {
                                setCloseModal(true);
                                setIsEditing(false)
                            }}
                        />
                        <Button
                            type={'button'}
                            className={'btn btn-primary add-button'}
                            content={<>Filtrar <img className="states-icon" src={FilterIcon} alt="" /></>}

                            style={{ margin: '5px' }}

                        />

                    </div>
                    <div className="states-desc">
                       <p className="states">Pendiente: {statesContent[1]('desc-states-icon')}</p>
                       <p className="states">En proceso: {statesContent[2]('desc-states-icon')}</p>
                       <p className="states">Finalizada: {statesContent[3]('desc-states-icon')}</p>
                    </div>
                </div>


                <div className="table-content">
                    <table className="task-table">
                        <thead>
                            <Thead props={
                                <>
                                    <Thitem props={'Tarea'} />
                                    <Thitem props={'Prioridad'} />
                                    <Thitem props={'Estado'} />
                                    <Thitem props={'Fecha de Inicio'} />
                                    <Thitem props={'Fecha de Finalización'} />
                                    <Thitem props={'Colaborador'} />
                                    <Thitem props={'Acciones'} />
                                </>
                            } />
                        </thead>
                        <tbody>
                            {tasks.map((item, index) => (
                                <tr key={index}>
                                    <Tditem props={item.descripcion} />
                                    <Tditem props={item.prioridad.descripcion} />
                                    <Tditem props={statesContent[item.estado.id]('states-icon')} />
                                    <Tditem props={item.fecha_inicio} />
                                    <Tditem props={item.fecha_fin} />
                                    <Tditem props={item.colaborador.nombre} />
                                    <Tditem props={
                                        <>
                                            {item.estado.id !== 2 && (
                                                <Link
                                                    className="actions"
                                                    onClick={() => eliminarTarea(item.id)}
                                                ><img className="actions-icon" src={DeleteIcon} alt="" /></Link>
                                            )}
                                            {item.estado.id === 1 || item.estado.id === 2 ? (
                                                <><Link
                                                    className="actions"
                                                    exact='true'
                                                    onClick={() => {
                                                        setEditTask(item);
                                                        setCloseModal(true);
                                                        setIsEditing(true)
                                                    }}
                                                ><img className="actions-icon" src={EditIcon} alt="" /></Link></>
                                            ) : null}
                                        </>
                                    } />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <TaskModal
                    setCloseModal={setCloseModal}
                    closeModal={closeModal}
                    task={editTask}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />

            </div>

        </>
    );
}