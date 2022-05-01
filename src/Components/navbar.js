import { AppBar, Toolbar, Typography } from '@mui/material';

const NavBar = ({ weekDaySelected, startTime, endTime, weekDaysInFr }) => {
    //Declaring component local handler function
    const formatWeekDays = () => {
        const length = weekDaySelected.length;
        const weekDays = [...weekDaySelected].map((day) => {return weekDaysInFr[day]});
        const last = weekDays.pop();
        return length === 1? weekDaysInFr[weekDaySelected[0]] : `${weekDays.join(', ')} ou ${last}.` ;
    }
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar disableGutters={false}>
                <Typography 
                    variant="h6" 
                    noWrap component="div" 
                    align="center" 
                    sx={{ width: "100%" }}>
                    {weekDaySelected.length > 0? 
                    `Je cherche une activité entre ${startTime}h et ${endTime}h le ${formatWeekDays()}` : 
                    `Choisis une plage horaire, des jours et découvre ce que tu peux faire sur Paname à ce moment là !!`}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;