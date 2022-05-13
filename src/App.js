import { Box, CssBaseline, Snackbar, Alert } from '@mui/material';

//Importing packages
import axios from "axios";

//Import React elements
import {useState, useEffect} from "react";

//Import components
import SideMenu from "./Components/sideMenu";
import NavBar from './Components/navbar';
import Map from './Components/map';
import AddLocationModal from './Components/modal';

function App() {
  // Delcaring local component variables
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const weekDaysInFr = {
    Monday: "Lundi", 
    Tuesday: "Mardi", 
    Wednesday: "Mercredi", 
    Thursday: "Jeudi", 
    Friday: "Vendredi", 
    Saturday: "Samedi", 
    Sunday: "Dimanche"
  };
  const tags = ["Bar 🍻", "Parc 🌳", "Club 💃", "Resto 👩‍🍳", "Culture 🎭", "Sport 🥊", "Commerce 🛍", "Loisir 🎳"];
  // Declaring component states
  const [dbLocations, setDbLocations] = useState([]);
  const [locations, setLocations] = useState([]); 
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(23);
  const [weekDaySelected, setWeekDaySelected] = useState(["Monday"]);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackType, setSnackType] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  // Declaring handle functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://anytimeinparis-back.herokuapp.com/");
      setDbLocations(response.data);
      setLocations(response.data);
    };
    fetchData();
  }, []);
  //Testing the logic with isSelected
  useEffect(() => {
    const timeSelected = startTime < endTime? [startTime, endTime] : [startTime, endTime + 24];
    const filteredLocations = dbLocations.filter((location) => {
      let display = false;
      weekDaySelected.forEach((day) => {
        const openingHours = location.openings[day].map((openingBracket) => {return openingBracket[0] < openingBracket[1]? openingBracket : [openingBracket[0], openingBracket[1] + 24]});
        openingHours.forEach((openingBracket) => {
          if ((timeSelected[0] >= openingBracket[0] && timeSelected[0] <= openingBracket[1]) ||
              (timeSelected[1] >= openingBracket[0] && timeSelected[1] <= openingBracket[1]) ||
              (timeSelected[0] <= openingBracket[0] && timeSelected[1] >= openingBracket[1])) {
                display = true;
              }
        })
      })
      return display;
    })
    setLocations(filteredLocations);
  }, [startTime, endTime, weekDaySelected]);
  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <CssBaseline />
      <NavBar 
        weekDaySelected={weekDaySelected} 
        startTime={startTime} 
        endTime={endTime} 
        weekDaysInFr={weekDaysInFr} />
      <SideMenu 
        setStartTime={setStartTime} 
        setEndTime={setEndTime} 
        weekDaySelected={weekDaySelected} 
        setWeekDaySelected={setWeekDaySelected} 
        weekDays={weekDays} 
        weekDaysInFr={weekDaysInFr} 
        tags={tags} 
        handleOpen={handleOpen} />
      <Map 
        locations={locations} />
      <AddLocationModal 
        open={open} 
        setOpen={setOpen}
        handleClose={handleClose} 
        weekDays={weekDays} 
        weekDaysInFr={weekDaysInFr}
        setOpenSnack={setOpenSnack} 
        setSnackType={setSnackType}
        setSnackMessage={setSnackMessage}  
      />
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => {setOpenSnack(false)}}
      >
        <Alert severity={snackType} sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
