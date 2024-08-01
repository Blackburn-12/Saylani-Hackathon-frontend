import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";
import Information from "../Components/Information";
import Classes from "../Components/Classes";
import NoClasses from "../Components/NoClasses"; // Import the new component
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Profile from "../Components/Profile";
import PdfId from "../Components/ID Card/pdfId";
import PassCard from "../Components/Result Cards/PassCard";
import FailCard from "../Components/Result Cards/FailCard";
import PendingCard from "../Components/Result Cards/PendingCard";
import Result from "../Components/Result Cards/Result";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageType, setPageType] = useState("Dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const checkWindowSize = () => {
    if (window.innerWidth < 426) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUserData());
    checkWindowSize(); // Check window size on component mount

    window.addEventListener("resize", checkWindowSize); // Add resize event listener

    document.body.classList.add("dashboardBackground");
    return () => {
      document.body.classList.remove("dashboardBackground");
      window.removeEventListener("resize", checkWindowSize); // Clean up event listener
    };
  }, [dispatch]);

  if (user.status === "loading") {
    return <div>Loading...</div>;
  }

  if (user.status === "failed") {
    navigate("/login");
  }

  return (
    <>
      <div className="backgroundOverlay"></div>
      <div
        className={`dashboardContainer ${
          isSidebarOpen ? "dashboardContainerToggled" : ""
        }`}
      >
        <SideBar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setPageType={setPageType}
          pageType={pageType}
        />
        <Navbar
          user={user.data}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setPageType={setPageType}
        />
        {pageType === "Profile" && <Profile user={user.data} />}
        {pageType === "Dashboard" && (
          <>
            <Information user={user.data} />
            <PdfId user={user.data} />
            {user.data.isPass === "Pass" && <PassCard />}
            {user.data.isPass === "Fail" && <FailCard />}
            {user.data.isPass === "Pending" && <PendingCard />}
            {user.data.classAlotted ? (
              <Classes classTiming={user.data.classAlotted} />
            ) : (
              <NoClasses />
            )}
          </>
        )}
        {pageType === "Results" && <Result user={user.data} />}
        {pageType === "Courses" && (
          user.data.classAlotted ? (
            <Classes classTiming={user.data.classAlotted} />
          ) : (
            <NoClasses />
          )
        )}
      </div>
    </>
  );
};

export default Dashboard;
