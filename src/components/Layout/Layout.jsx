import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import SideBar from "./Sidebar/Sidebar";

const Layout = () => {
  const isUserLoggedIn = true;
  return (
    <main className="">
      <Header />
      {isUserLoggedIn ? (
        <div className="">
          <SideBar>
            <Outlet />
          </SideBar>
        </div>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </main>
  );
};

export default Layout;
