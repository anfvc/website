import "./App.css";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Tech from "./Components/Tech/Tech";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode);

  const appTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  function handleChange() {
    if (mode) setMode(false);
    else setMode(true);
  }

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Paper elevation={0} square sx={{width: "100vw"}}>
          <Header mode={mode} handleChange={handleChange} />
          <main className="w-full">
            <Hero mode={mode} />
            <Tech />
            <About mode={mode} />
            <Projects mode={mode} />
            <Contact mode={mode} />
          </main>
          <Footer />
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;
