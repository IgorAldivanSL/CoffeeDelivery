import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';

export function DefaultLayout() {
  return (
    <div className="layout-container">
      <Header />
      <Outlet />
    </div>
  );
}
