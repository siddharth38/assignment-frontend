import React, { useContext, useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
  Paper,
  IconButton,
  Button,
  Typography,
  AppBar,
  Container,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../context/UserContext";
import EditUserPopup from "./EditUserPopup";
import AddUserPopup from "./AddUserPopup";

const Home = () => {
  const {
    users,
    handleEditClick,
    handleDeleteUser,
    setOpenAddDialog,
    fetchUsers,
  } = useContext(UserContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(users);

  useEffect(() => {
    setSearchResults(users);
  }, [users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults(users);
    } else {
      const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredUsers);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchResults(users);
  };

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  return (
    <Container
      style={{
        marginTop: "64px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        style={{
          width: "90%",
          padding: "16px",
          marginTop: "16px",
          margin: "auto",
        }}
      >
        <AppBar position="static">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">User Management</Typography>
            <IconButton
              color="inherit"
              onClick={handleAddDialogOpen}
              aria-label="add"
            >
              <Typography variant="h6" style={{ marginLeft: 10 }}>
                Add User +
              </Typography>
            </IconButton>
          </div>
        </AppBar>
        <TextField
          label="Search Users"
          variant="outlined"
          margin="normal"
          fullWidth
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            fullWidth
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReset}
            fullWidth
          >
            Reset
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell sx={{ marginLeft: "16px" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((user) => (
                  <TableRow key={user?._id}>
                    <TableCell>
                      {user?.firstName} {user?.lastName}
                    </TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteUser(user?._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={searchResults?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>

        {/* Add User Popup */}
        <AddUserPopup />
        <EditUserPopup />
      </Paper>
    </Container>
  );
};

export default Home;
