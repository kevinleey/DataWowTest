"use client";

import ConcertList from "./_components/ConcertList";
import Statistics from "./_components/Statistics";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import CreateForm from "./_components/CreateForm";
import ConcertSnackbar from "./_components/ConcertSnackbar";

const mockConcerts = [
  {
    id: 1,
    name: "Concert Name 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra bibendum volutpat. Etiam volutpat nulla ut felis sollicitudin, eget varius sapien convallis. Cras sem nunc, ullamcorper ac purus non, fringilla pulvinar dui. Quisque ut commodo mi, ut efficitur massa. Donec ligula turpis, tincidunt tempor nunc eget, congue placerat felis. Sed dictum risus vitae vulputate vehicula. Cras sit amet nibh dapibus, rutrum felis a, rhoncus augue.",
    reservations: 500,
  },
  {
    id: 2,
    name: "Concert Name 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra bibendum volutpat. Etiam volutpat nulla ut felis sollicitudin, eget varius sapien convallis.",
    reservations: 0,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
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
        <ConcertList concerts={concerts} />
      </CustomTabPanel>
      <CustomTabPanel index={1} value={value}>
        <CreateForm handleFormSuccess={handleFormSuccess} />
      </CustomTabPanel>
      <ConcertSnackbar open={isSnackbarOpen} onClose={handleSnackbarClose} />
    </div>
  );
}
