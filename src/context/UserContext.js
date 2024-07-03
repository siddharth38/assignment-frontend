import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // Import the axios instance
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [role, setRole] = useState('');
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newUser, setNewUser] = useState({
        firstName: '', lastName: '', email: '', password: '', role: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        fetchUsers();
    }, []);

    let history = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/users');
            console.log(response.data)
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setOpenEditDialog(true);
    };

    const handleEditClose = () => {
        setOpenEditDialog(false);
        setSelectedUser(null);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleUpdateUser = async () => {
        try {
            await axiosInstance.put(`/users/${selectedUser._id}`, {
                selectedUser,
            });
            fetchUsers();
            setOpenEditDialog(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axiosInstance.delete(`/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            // Check if the email already exists
            const existingUser = users.find(user => user.email === newUser.email);
            if (existingUser) {
                setSnackbarMessage('User with this email already exists');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                return;
            }

            // Proceed to add user if no duplicate found
            await axiosInstance.post('/users', newUser);
            fetchUsers();
            setOpenAddDialog(false);
            setNewUser({
                firstName: '', lastName: '', email: '', password: '', role: ''
            });

            // Show success message
            setSnackbarMessage('User added successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error adding user:', error.response.data);

            // Show error message
            setSnackbarMessage(`Error adding user: ${error.message}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleAddDialogOpen = () => {
        setOpenAddDialog(true);
    };

    const handleAddDialogClose = () => {
        setOpenAddDialog(false);
        setNewUser({ firstName: '', lastName: '', email: '', password: '', role: '' });
    };

    const handleInputChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        history('/login');
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <UserContext.Provider
            value={{
                users,
                selectedUser,
                openEditDialog,
                openAddDialog,
                role,
                newUser,
                setNewUser,
                fetchUsers,
                handleEditClick,
                handleEditClose,
                handleRoleChange,
                handleUpdateUser,
                handleDeleteUser,
                handleAddUser,
                handleAddDialogOpen,
                handleAddDialogClose,
                handleInputChange,
                handleLogout,
                setOpenAddDialog,
                setSelectedUser,
            }}
        >
            {children}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000} // Adjust duration as needed
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </UserContext.Provider>
    );
};
