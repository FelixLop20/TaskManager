import { Header } from "../components/Header";
import { Tditem } from "../components/table/Tditem";
import { Button } from "../components/form/Button";
import { TaskModal } from "../components/TaskModal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminTasksAPI } from "../api/AdminTasksAPI";
import { Thead } from "../components/table/Thead";
import { Thitem } from "../components/table/Thitem";

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

    return (
        <>
            <div className="container">
                <Header
                    className={'main_title'}
                    content={'Administrador de tasks'}
                />
                <div className="button_content">
                    <Button
                        type={'button'}
                        className={'btn btn-primary add_button'}
                        content={'Crear nueva tarea'}
                        style={{ margin: '5px' }}
                        onClick={() => {
                            setCloseModal(true);
                            setIsEditing(false)
                        }}
                    />
                    <Button
                        type={'button'}
                        className={'btn btn-primary add_button'}
                        content={'Filtrar'}

                        style={{ margin: '5px' }}

                    />
                </div>

                <div className="table_content">
                    <table className="table table-dark table-striped">
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
                                    <Tditem props={item.estado.descripcion} />
                                    <Tditem props={item.fecha_inicio} />
                                    <Tditem props={item.fecha_fin} />
                                    <Tditem props={item.colaborador.nombre} />
                                    <Tditem props={
                                        <>
                                            {item.estado.id === 1 || item.estado.id === 2 ? (
                                                <><Link
                                                    className="acciones"
                                                    exact='true'
                                                    onClick={() => {
                                                        setEditTask(item);
                                                        setCloseModal(true);
                                                        setIsEditing(true)
                                                    }}
                                                >Editar</Link></>
                                            ) : null}
                                            {item.estado.id !== 2  && (
                                                <Link
                                                    className="acciones"
                                                    onClick={() => eliminarTarea(item.id)}
                                                >Eliminar</Link>
                                            )}
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