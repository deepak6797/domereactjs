import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaAnglesLeft, FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { IoPower } from 'react-icons/io5';
import SidebarLinkGroup from './SidebarLinkGroup';
import { SIDE_BAR_ITEMS } from '../../constant/sidebar';
import { getValue } from '../../utils/object';
import { PATH } from '../../constant/path';
import { useAuthContext } from '../../hooks/contextConsumer.hook';
import { removeCookie } from '../../utils/cookie';
import { AUTH_COOKIE_CONFIG } from '../../constant/common';
import BlockSeasLogo from "../../assets/logo/logo-white.png"

interface SideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => unknown;
}

const SideBar: React.FC<SideBarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const { setIsLoggedIn } = useAuthContext();

  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', String(sidebarExpanded));
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const onLogoutClick = () => {
    setIsLoggedIn(false);
    removeCookie(AUTH_COOKIE_CONFIG.loggedInCookie);
    removeCookie(AUTH_COOKIE_CONFIG.userAccessToken);
    removeCookie(AUTH_COOKIE_CONFIG.userRefreshToken);
  };

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      {/* <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div> */}

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-24 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <FaAnglesLeft className="text-xl" />
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
        <img src={BlockSeasLogo} alt="blockseas" className='w-10 h-10' />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
            </h3>
            <ul className="mt-3 flex flex-col gap-1">
              {SIDE_BAR_ITEMS.map((data) => {
                const hasChildren = getValue(data, 'children', []).length > 0;

                const childrenLinks = data.children?.map((child) => child.link);

                const isActive = childrenLinks?.includes(pathname) || false;

                return (
                  <>
                    {hasChildren ? (
                      <SidebarLinkGroup
                        activecondition={isActive}
                        key={data.title}
                      >
                        {(handleClick, open) => {
                          return (
                            <>
                              <a
                                href="#0"
                                className={`block text-slate-200 truncate transition duration-150 ${
                                  isActive
                                    ? 'hover:text-slate-200'
                                    : 'hover:text-white'
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  sidebarExpanded
                                    ? handleClick()
                                    : setSidebarExpanded(true);
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="text-3xl text-gray-400 shrink-0">
                                      {data.icon}
                                    </div>

                                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                      {data.title}
                                    </span>
                                  </div>
                                  {/* Icon */}
                                  <div className="flex shrink-0 ml-2 text-slate-400 text-sm">
                                    {open ? <FaAngleUp /> : <FaAngleDown />}
                                  </div>
                                </div>
                              </a>
                              <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                <ul
                                  className={`pl-9 mt-1 ${!open && 'hidden'}`}
                                >
                                  {data.children?.map((child) => (
                                    <li
                                      className="mb-1 last:mb-0"
                                      key={child.title}
                                    >
                                      <NavLink
                                        end
                                        to={child.link}
                                        className={({ isActive }) =>
                                          'block transition duration-150 truncate ' +
                                          (isActive
                                            ? 'text-indigo-500'
                                            : 'text-slate-400 hover:text-slate-200')
                                        }
                                      >
                                        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                          {child.title}
                                        </span>
                                      </NavLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          );
                        }}
                      </SidebarLinkGroup>
                    ) : (
                      <li
                        className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                          pathname.includes(data.link!) && 'bg-slate-900'
                        }`}
                        key={data.title}
                      >
                        <NavLink
                          end
                          to={data.link!}
                          className={`block text-slate-200 truncate transition duration-150 ${
                            pathname.includes(data.link!)
                              ? 'hover:text-slate-200'
                              : 'hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="grow flex items-center">
                              <div className="text-gray-400 shrink-0">
                                {data.icon}
                              </div>

                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                {data.title}
                              </span>
                            </div>
                            {/* Badge */}
                            {data.link === PATH.message && (
                              <div className="flex flex-shrink-0 ml-2">
                                <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded">
                                  4
                                </span>
                              </div>
                            )}
                          </div>
                        </NavLink>
                      </li>
                    )}
                  </>
                );
              })}
            </ul>
          </div>
          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
            </h3>
            <ul className="mt-3"></ul>
          </div>
        </div>

        <div className="pt-3  justify-end mt-auto flex-col">
          {/* Logout button */}
          <div className="px-3 py-2 mb-5">
            <button
              className={`block text-slate-200 truncate transition duration-150`}
              onClick={onLogoutClick}
            >
              <div className="flex items-center justify-between">
                <div className="grow flex items-center">
                  <div className="text-gray-400 shrink-0">
                    <IoPower className="text-3xl" />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Expand / collapse button */}
          <div className="px-3 py-2 hidden lg:inline-flex 2xl:hidden">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
