import React, { useContext } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { UserContext } from '../context/UserContext';

const EditUserPopup = () => {
    const {
        openEditDialog,
        handleEditClose,
        handleRoleChange,
        handleUpdateUser,
        selectedUser,
        role,
        setSelectedUser,
    } = useContext(UserContext);

    const handleInputChange = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={openEditDialog} onClose={handleEditClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    value={selectedUser?.firstName}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    fullWidth
                    value={selectedUser?.lastName}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={selectedUser?.email}
                    onChange={handleInputChange}
                />


            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button onClick={handleUpdateUser} variant="contained" color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserPopup;
