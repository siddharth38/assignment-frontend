import React, { useContext, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import { UserContext } from '../context/UserContext';

const AddUserPopup = () => {
    const { openAddDialog, setOpenAddDialog, handleAddUser, handleInputChange, newUser, setNewUser } = useContext(UserContext);

    const [errors, setErrors] = useState({});

    const handleClose = () => {
        setOpenAddDialog(false);
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.firstName = newUser.firstName ? "" : "First Name is required.";
        tempErrors.lastName = newUser.lastName ? "" : "Last Name is required.";
        tempErrors.email = newUser.email ? "" : "Email is required.";
        if (newUser.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
            tempErrors.email = "Email is not valid.";
        }
        tempErrors.password = newUser.password ? "" : "Password is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = () => {
        if (validate()) {
            handleAddUser(newUser);
            setNewUser({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role: 'User',
            });
        }
    };

    return (
        <Dialog open={openAddDialog} onClose={handleClose}>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="firstName"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={newUser.firstName}
                            onChange={handleInputChange}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            name="lastName"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={newUser.lastName}
                            onChange={handleInputChange}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={newUser.email}
                            onChange={handleInputChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={newUser.password}
                            onChange={handleInputChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserPopup;
