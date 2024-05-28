"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Modal,
  TextField,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function AdminComponent() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        showSnackbar("Error fetching users", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBanUser = async (userId: string) => {
    try {
      await fetch("/api/banUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      setUsers(users.filter((user) => user.id !== userId));
      showSnackbar("User banned successfully", "success");
    } catch (error) {
      console.error("Error banning user:", error);
      showSnackbar("Error banning user", "error");
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
  };

  const handleEditUserSubmit = async () => {
    if (!editingUser) return;

    try {
      await fetch("/api/editUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: editingUser.id,
          name: editingUser.name,
          username: editingUser.username,
          email: editingUser.email,
        }),
      });
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
      setEditingUser(null);
      showSnackbar("User edited successfully", "success");
    } catch (error) {
      console.error("Error editing user:", error);
      showSnackbar("Error editing user", "error");
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  const darkBlueTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2", // Blue color
      },
      background: {
        default: "#121212", // Dark background
        paper: "#1e1e1e", // Dark paper background
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#2e2e2e", // Slightly lighter than the default background
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Page
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Welcome, admin!
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {users.map((user) => (
              <Grid item xs={12} sm={6} key={user.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography color="textSecondary">{user.email}</Typography>
                    <Typography color="textSecondary">
                      {user.username}
                    </Typography>
                    <Typography color="textSecondary">{user.role}</Typography>
                    <Typography color="textSecondary">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleBanUser(user.id)}
                    >
                      Ban
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Modal open={!!editingUser} onClose={() => setEditingUser(null)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            {editingUser && (
              <>
                <Typography variant="h6" mb={2}>
                  Edit User
                </Typography>
                <TextField
                  fullWidth
                  label="Name"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Username"
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  margin="normal"
                />
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button onClick={() => setEditingUser(null)} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEditUserSubmit}
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2 }}
                  >
                    Save
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={closeSnackbar}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
