//Importing packages
import { Button, Chip, Grid, Select, FormControl, MenuItem, InputLabel, Box, Drawer, Toolbar, Slider, Typography, Divider, OutlinedInput } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';

const SideMenu = ({ setWeekDaySelected, setStartTime, setEndTime, weekDaySelected, weekDays, weekDaysInFr, tags, handleOpen }) => {
    const drawerWidth = 300;
    const handleWeekDays = (event) => {
        const {
          target: { value },
        } = event;
        setWeekDaySelected(
          typeof value === 'string' ? value.split(',') : value,
        );
      };
    return (
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
                  onChange={(e) => {setStartTime(e.target.value)}}
                  aria-labelledby="input-slider"
                  defaultValue={0}
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
                  onChange={(e) => {setEndTime(e.target.value)}}
                  defaultValue={23}
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
                    {weekDaysInFr[day]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* <Box sx={{ width: "100%", paddingBottom: "40px"  }}>
          {tags.map((tag, index) => {return (
              <Chip key={index} label={tag} onClick={() => console.log("Click!")} sx={{ margin: "5px"}}/>
            )}
          )}
          </Box> */}
          <Divider />
          <Button onClick={handleOpen} variant="contained" disableElevation size="large" endIcon={<AddIcon />} sx={{ width: "100%", marginTop: "40px" }} >Ajouter un lieu</Button>
        </Box>
      </Drawer>
    );
}

export default SideMenu;