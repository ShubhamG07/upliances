import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const Counter = ({  setBgRows}) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setBgRows((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setBgRows((prev) => (prev > 0 ? prev - 1 : 0));
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleReset = () => {
    setBgRows(0);
    setCount(0);
  };

  return (
    <Box sx={{ textAlign: "center",marginBottom:"50px",border:"2px solid black", zIndex: 1, position: "relative", padding: "50px",borderRadius:"10px" }}>
      <Typography variant="h4" sx={{marginBottom:"20px"}}>Counter: {count}</Typography>
      <Button onClick={handleIncrement} variant="contained" sx={{ m: 1 }}>
        Increment
      </Button>
      <Button onClick={handleReset} variant="contained" color="error" sx={{ m: 1 }}>
        Reset
      </Button>
      <Button onClick={handleDecrement} variant="contained" sx={{ m: 1 }}>
        Decrement
      </Button>
      
    </Box>
  );
};

export default Counter;
