//Importing packages
import { Backdrop, Grid, Fade, Fab, Modal, Box, Typography, TextField, InputAdornment, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Remove';

//Importing React elements
import { useState } from "react";

const AddLocationModal = ({ open, handleClose, weekDays, weekDaysInFr }) => {
    //Adding component usestate
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [openingTimes, setOpeningTimes] = useState({Monday: [[]], Tuesday: [[]], Wednesday: [[]], Thursday: [[]], Friday: [[]], Saturday: [[]], Sunday: [[]]});
    //Adding component local handler function
    const addOpenings = (day) => {
        const newOpenings = {...openingTimes};
        newOpenings[day].push([]);
        setOpeningTimes(newOpenings);
    };
    const removeOpenings = (day) => {
        const newOpenings = {...openingTimes};
        newOpenings[day].pop();
        setOpeningTimes(newOpenings);
    };
    const handleOpenings = (e, day, timeIndex) => {
        const newOpenings = {...openingTimes};
        newOpenings[day][timeIndex][0] = e.target.value;
        setOpeningTimes(newOpenings);
    };
    const handleClosings = (e, day, timeIndex) => {
        const newOpenings = {...openingTimes};
        newOpenings[day][timeIndex][1] = e.target.value;
        setOpeningTimes(newOpenings);
    };
    return (
        <Modal
            aria-labelledby="add-new-location-modal"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 700,
                    maxHeight: 600,
                    minWidth: 380,
                    minHeight: 380,
                    overflow:'scroll', 
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4}}>
                    <Typography variant="h6" component="h2" textAlign="center" sx={{ marginBottom: "20px" }}>
                        Ajoutez un nouveau lieu 🎉
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField onChange={(e) => {setName(e.target.value)}} label="Name" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={(e) => {setDescription(e.target.value)}} label="Description" variant="outlined" multiline rows={2} fullWidth/>
                        </Grid>
                        {/* How to handle error state? Check with natural component features? */}
                        <Grid item xs={6}>
                            <TextField 
                                onChange={(e) => {setLatitude(e.target.value)}} 
                                label="Latitude" 
                                variant="outlined" 
                                fullWidth
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                onChange={(e) => {setLongitude(e.target.value)}} 
                                label="Longitude" 
                                variant="outlined" 
                                fullWidth
                                type="number"
                            />
                        </Grid>
                        {weekDays.map((day, index) => {
                            return (
                                <Grid id={day} item container xs={12} md={12} lg={6} spacing={1} key={index} sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
                                <Grid item xs={12} >
                                    <Typography sx={{ width: "100px" }}>
                                    {weekDaysInFr[day]}
                                    </Typography>
                                </Grid>
                                {openingTimes[day].map((time, timeIndex) => {
                                    return (
                                        <>
                                            <Grid item xs={5}>
                                                <TextField onChange={(e) => {handleOpenings(e, day, timeIndex)}} type="time" variant="outlined" size="small" InputProps={{endAdornment: <InputAdornment position="end">h</InputAdornment>}} />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TextField onChange={(e) => {handleClosings(e, day, timeIndex)}} type="time" variant="outlined" size="small" InputProps={{endAdornment: <InputAdornment position="end">h</InputAdornment>}} />
                                            </Grid>
                                            {timeIndex === openingTimes[day].length - 2 && 
                                                <Grid item xs={2}>
                                                    <Fab onClick={() => removeOpenings(day)} size="small" aria-label="add">
                                                        <DeleteIcon />
                                                    </Fab>   
                                                </Grid>}
                                            {timeIndex === openingTimes[day].length - 1 && 
                                            <Grid item xs={2}>
                                                <Fab onClick={() => addOpenings(day)} size="small" aria-label="add">
                                                    <AddIcon />
                                                </Fab>   
                                            </Grid>}    
                                        </>
                                    )
                                })}
                                </Grid>
                            )
                        })}
                        <Grid item xs={12}>
                            <Button variant="contained" disableElevation size="large" sx={{ width: "100%", marginTop: "40px" }} >Ajouter un lieu</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    )
};

export default AddLocationModal;