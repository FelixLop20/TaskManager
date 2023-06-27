import './css/global.css'
import { Header } from './components/Header';
import { Table } from './components/table/Table';

export function App() {
  return (
    <div>
      <Header
        className={'main_title'}
        content={'Administrador de Tareas'}
      />
      <Table />
    </div>
  );
}
