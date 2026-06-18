import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ toggleSidebar, children }: { toggleSidebar?: () => void, children?: React.ReactNode }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    modalRef.current?.showModal();
  };

  const executeLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 border-b border-base-300 h-16 w-full z-10 sticky top-0">
      <div className="flex-none">
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="btn btn-square btn-ghost"
            aria-label="toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        )}
      </div>
      <div className="flex-1 px-2 mx-2">
        {children || (
          <div className="form-control w-full max-w-sm hidden sm:block">
            <input type="text" placeholder="Search..." className="input input-sm input-bordered w-full" />
          </div>
        )}
      </div>
      <div className="flex-none flex items-center gap-3">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={handleLogoutClick}>Logout</a></li>
          </ul>
        </div>
      </div>

      {/* Logout Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg">Confirm Logout</h3>
          <p className="py-4">Are you sure you want to log out?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={executeLogout}>Yes, Logout</button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}