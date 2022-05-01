// CHECK HOW TO ADD CSS RESET TO REACT PROJECTS
// CHECK HOW TO DEAL WITH HOURS

import { Box, CssBaseline } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

//Importing assets
import "./App.scss";
import locationsFromJson from "./Assets/Data/paris-location.json"; 


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
  const [locations, setLocations] = useState(locationsFromJson.data); 
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(23);
  const [weekDaySelected, setWeekDaySelected] = useState([]);
  const [open, setOpen] = useState(false);
  // Declaring handle functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Testing the logic with isSelected
  useEffect(() => {
    const timeSelected = startTime < endTime? [startTime, endTime] : [startTime, endTime + 24];
    const filteredLocations = locationsFromJson.data.filter((location) => {
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
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
      <NavBar weekDaySelected={weekDaySelected} startTime={startTime} endTime={endTime} weekDaysInFr={weekDaysInFr} />
      <SideMenu setStartTime={setStartTime} setEndTime={setEndTime} weekDaySelected={weekDaySelected} setWeekDaySelected={setWeekDaySelected} weekDays={weekDays} weekDaysInFr={weekDaysInFr} tags={tags} handleOpen={handleOpen} />
      <Map locations={locations} />
      <AddLocationModal open={open} handleClose={handleClose} weekDays={weekDays} weekDaysInFr={weekDaysInFr} />
  </Box>
  );
}

export default App;
