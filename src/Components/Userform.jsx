import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const UserForm = () => {
  const [user, setUser] = useState({ id: Date.now(), name: "", email: "", phone: "", address: "" });
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [id, setId] = useState(Date.now());
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", address: "" });




  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes!";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsavedChanges]);

  // function to handle error in input field 

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "name":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          errorMessage = "Name can only contain letters and spaces.";
        }
        break;

      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errorMessage = "Enter a valid email address.";
        }
        break;

      case "phone":
        if (!/^\d{10}$/.test(value)) {
          errorMessage = "Phone number must be exactly 10 digits.";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setUnsavedChanges(true);
    validateField(name, value);
  };

  const handleSubmit = () => {
    if (!errors.name && !errors.email && !errors.phone) {
      localStorage.setItem("userData", JSON.stringify(user));
      window.dispatchEvent(new Event("storage"));
      alert("User data saved!");
    } else {
      alert("Please fix validation errors before submitting.");
    }
  };
  return (
    <Box sx={{textAlign:"center",ml:25, p: 5, backgroundColor: "white", borderRadius: "8px", mt: 2, zIndex: 1,width:"55vw",boxShadow:"2px 2px 5px 5px seagreen" }}>
      <Typography variant="h5">User Form</Typography>
      <TextField type="text" label="Name" name="name" onChange={handleChange} fullWidth sx={{ my: 2,width:"50vw" }}  error={!!errors.name}
        helperText={errors.name} />
      <TextField type="email" label="Email" name="email" onChange={handleChange} fullWidth sx={{ mb: 2,width:"50vw" }} error={!!errors.email}
        helperText={errors.email} />
      <TextField label="Phone" name="phone" onChange={handleChange} fullWidth sx={{ mb: 2 ,width:"50vw"}}   error={!!errors.phone}
        helperText={errors.phone}/>
      <TextField label="Address" name="address" onChange={handleChange} fullWidth sx={{ mb: 2,width:"50vw" }} />
      <TextField label="User Id (auto-generated)" name="ID" value={id} fullWidth sx={{ mb: 2,width:"50vw" }} />
      <Button variant="contained" onClick={handleSubmit} sx={{width:"50vw"}}>Save</Button>
    </Box>
  );
};

export default UserForm;
