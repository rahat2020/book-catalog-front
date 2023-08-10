import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';

export default function MainLayouts() {
  return (
    <div>
      <Topbar />
      <div className="pt-5">
        <Outlet />
      </div>
    </div>
  );
}
