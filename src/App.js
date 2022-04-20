// CHECK HOW TO ADD CSS RESET TO REACT PROJECTS
// CHECK HOW TO DEAL WITH HOURS

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//Importing assets
import "./App.scss";
import locationsFromJson from "./Assets/Data/paris-location.json"; 

//Importing packages
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

//Import React elements
import {useState, useEffect} from "react";




//Import components


function App() {
  // Delcaring local component variables
  const drawerWidth = 300;
  const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const tags = ["Bar 🍻", "Parc 🌳", "Club 💃", "Resto 👩‍🍳", "Culture 🎭", "Sport 🥊", "Commerce 🛍", "Loisir 🎳"];
  // Declaring component states
  const [locations, setLocations] = useState(locationsFromJson.data); 
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [weekDaySelected, setWeekDaySelected] = useState([]);
  // Declaring handle functions
  const formatWeekDays = () => {
    const length = weekDaySelected.length;
    const weekDays = [... weekDaySelected];
    const last = weekDays.pop();
    return length === 1? weekDaySelected[0] : `${weekDays.join(', ')} ou ${last}.` ;
  }
  const handleWeekDays = (event) => {
    const {
      target: { value },
    } = event;
    setWeekDaySelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  //Testing the logic with isSelected
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    let newArray = locationsFromJson.data.filter((location) => {return location.openings.Monday[0].length !== 0});;
    if (isSelected) {
      setLocations(newArray);
    }
    else {
      setLocations(locationsFromJson.data)
    }
  }, [isSelected]);
  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar disableGutters={false}>
        <Typography variant="h6" noWrap component="div" align="center" sx={{ width: "100%" }}>
          {weekDaySelected.length > 0? `Je cherche une activité entre ${startTime}h et ${endTime}h le ${formatWeekDays()}` : `Choisis une plage horaire, des jours et découvre ce que tu peux faire dans le XVIIIe !!`}
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', padding: '20px' }}>
        <Box sx={{ width: "100%", paddingBottom: "40px", paddingTop: "40px" }}>
          <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography id="input-slider" gutterBottom>
              Début
            </Typography>
            </Grid>
            <Grid item xs>
              <Slider
                startTime={typeof startTime === 'number' ? startTime : 0}
                onChange={(e) => {setStartTime(e.target.value)}}
                aria-labelledby="input-slider"
                size="small"
                step={1} 
                marks min={0} 
                max={23} 
                valueLabelDisplay="on"
              />
            </Grid>
            <Grid item>
              <AccessTimeIcon />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: "100%", paddingBottom: "40px"  }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography id="input-slider" gutterBottom>
                Fin
              </Typography>
            </Grid>
            <Grid item xs>
              <Slider
                endTime={typeof endTime === 'number' ? endTime : 0}
                onChange={(e) => {setEndTime(e.target.value)}}
                aria-labelledby="input-slider"
                size="small"
                step={1} 
                marks min={0} 
                max={23} 
                valueLabelDisplay="on"
              />
            </Grid>
            <Grid item>
              <AccessTimeIcon />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: "100%", paddingBottom: "40px" }}>
          <FormControl sx={{ width: "100%"}}>
            <InputLabel id="weekDaySelect">Jour</InputLabel>
            <Select
              labelId="weekDaySelect"
              id="weekDay"
              multiple
              value={weekDaySelected}
              onChange={handleWeekDays}
              input={<OutlinedInput label="Jour" />}
            >
              {weekDays.map((day) => (
                <MenuItem
                  key={day}
                  value={day}
                >
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: "100%", paddingBottom: "40px"  }}>
        {tags.map((tag, index) => {return (
            <Chip label={tag} onClick={() => console.log("Click!")} sx={{ margin: "5px"}}/>
          )}
        )}
        </Box>
        <Divider />
        <Button variant="contained" disableElevation size="large" endIcon={<AddIcon />} sx={{ width: "100%", marginTop: "40px" }} >Ajouter un lieu</Button>
      </Box>
    </Drawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh", padding: "0" }}>
      <Toolbar />
      <MapContainer
        style={{ height: "100%" }}
        center={[48.8924960, 2.3440200]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => {
          return (
            <Marker key={location.properties.location_id} position={[location.geography.coordinates[0], location.geography.coordinates[1]]}>
              <Popup>
                <p>{location.properties.NAME}</p>
                <p>{location.properties.DESCRIPTIO}</p>
              </Popup>
            </Marker> 
          )
        })}
      </MapContainer>
    </Box>
  </Box>


  );
}

export default App;
