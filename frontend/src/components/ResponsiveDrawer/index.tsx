import { useState } from "react";
import { CssBaseline, IconButton, Typography, Paper, Toolbar, AppBar, Drawer, Box, ThemeProvider, createTheme, experimentalStyled as styled, useTheme, Grid2 as Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerComponent from "./DrawerComponent";
import StarBorder from "../StarBorder";

const drawerWidth = 280;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7c4dff",
    },
    text: {
      secondary: "#b39ddb",
    },
  },
});

const ResponsiveDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const theme = useTheme();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => setIsClosing(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: "#ffffff",
    ...theme.typography.body2,
    // padding: theme.spacing(2),
    textAlign: "center",
    // height: "100%",
    // color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1a2027",
    }),
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dev Sketches by Tatyana Karpenko
            </Typography>
          </Toolbar>
        </AppBar>

        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            slotProps={{
              root: {
                keepMounted: true,
              },
            }}
          >
            <DrawerComponent />
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
            open
          >
            <DrawerComponent />
          </Drawer>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {Array.from(Array(26)).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <StarBorder as="div" color={theme.palette.primary.main}>
                  <Item>{`Card ${index + 1}`}</Item>
                </StarBorder>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ResponsiveDrawer;
