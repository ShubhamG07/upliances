import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Counter from "./Components/Counter";
import UserForm from "./Components/Userform";
import RichTextEditor from "./Components/Richtext";

const App = () => {
  const [bgRows, setBgRows] = useState(0);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        flexWrap:"wrap",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Ladder Background Effect */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: `${bgRows * 15}px`,
          background: `repeating-linear-gradient(to top,rgb(33, 214, 247) 0px,rgb(16, 203, 236) 10px, white 20px)`,
          transition: "height 0.3s ease-in-out",
        }}
      />
      
      <Counter setBgRows={setBgRows} />
      <RichTextEditor />
      <UserForm />
      
    </Box>
  );
};

export default App
