"use client";

import ConcertList from "./_components/ConcertList";
import Statistics from "./_components/Statistics";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import CreateForm from "./_components/form/CreateForm";
import ConcertSnackbar from "./_components/ConcertSnackbar";
import CustomTabPanel from "./_components/CustomTabPanel";
import Navbar from "./_components/navbar/Navbar";
import { useUser } from "./_context/UserContext";

export default function HomePage() {
  const [value, setValue] = useState(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [action, setAction] = useState("");
  const { user } = useUser();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleConcertCreate = () => {
    setIsSnackbarOpen(true);
    setValue(0);
    setAction("created");
  };

  const handleConcertDelete = () => {
    setIsSnackbarOpen(true);
    setAction("deleted");
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div className="main-container">
      <Navbar />
      <div className="page">
        {user?.role === "admin" ? (
          <>
            <Statistics />
            <Tabs
              className="tab-container"
              value={value}
              onChange={handleChange}
            >
              <Tab label="Overview" />
              <Tab label="Create" />
            </Tabs>
            <CustomTabPanel index={0} value={value}>
              <ConcertList
                handleDeleteSuccess={handleConcertDelete}
                curUser={user}
              />
            </CustomTabPanel>
            <CustomTabPanel index={1} value={value}>
              <CreateForm handleFormSuccess={handleConcertCreate} />
            </CustomTabPanel>
          </>
        ) : (
          <ConcertList
            handleDeleteSuccess={handleConcertDelete}
            curUser={user}
          />
        )}
        <ConcertSnackbar
          open={isSnackbarOpen}
          action={action}
          onClose={handleSnackbarClose}
        />
      </div>
    </div>
  );
}
