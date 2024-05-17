"use client";

import ConcertList from "./_components/ConcertList";
import Statistics from "./_components/Statistics";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import CreateForm from "./_components/CreateForm";
import ConcertSnackbar from "./_components/ConcertSnackbar";
import CustomTabPanel from "./_components/CustomTabPanel";
import { useConcerts } from "./_context/ConcertContext";

interface Concert {
  id: number;
  name: string;
  description: string;
  reservations: number;
}

export default function HomePage() {
  const { setConcerts } = useConcerts();
  const [value, setValue] = useState(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleFormSuccess = (newConcert: Concert) => {
    setConcerts((prevConcerts) => [...prevConcerts, newConcert]);
    setIsSnackbarOpen(true);
    setValue(0);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <div className="page">
      <Statistics />
      <Tabs className="tab-container" value={value} onChange={handleChange}>
        <Tab label="Overview" />
        <Tab label="Create" />
      </Tabs>
      <CustomTabPanel index={0} value={value}>
        <ConcertList />
      </CustomTabPanel>
      <CustomTabPanel index={1} value={value}>
        <CreateForm handleFormSuccess={handleFormSuccess} />
      </CustomTabPanel>
      <ConcertSnackbar open={isSnackbarOpen} onClose={handleSnackbarClose} />
    </div>
  );
}
