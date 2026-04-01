import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Todos from './Todos.tsx'
import Chat from './aiChat/Chat.tsx'
import DrawerLeft from './DrawerLeft.tsx'
import design from '../../design.json';
import {useSearchParams} from "react-router-dom";


const drawerWidth = 240;

export default function MainScreen() {
    const [searchParams] = useSearchParams();

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: design.backgroundColourGray, }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, bgcolor: design.backgroundColourGray, height: '100vh' }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, colour: design.backgroundColourGray },

          }}
          open
        >
          <DrawerLeft/>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, backgroundColor: design.backgroundColourBlue}, hight: "100vh" }}
      >
          {searchParams.get("id") === "4" && <Chat/> || <Todos/>}
      </Box>
    </Box>
  );
}


