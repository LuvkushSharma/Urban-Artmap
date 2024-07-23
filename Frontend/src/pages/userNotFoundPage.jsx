import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    },
    content: {
        textAlign: 'center',
        padding: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
    },
    title: {
        marginBottom: 2,
        color: '#333',
    },
    message: {
        marginBottom: 4,
        color: '#666',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
    },
    link: {
        textDecoration: 'none',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
    },
};

const UserNotFoundPage = () => {
    return (
        <Container maxWidth="xs" sx={styles.container}>
            <Box sx={styles.content}>
                <Typography variant="h3" component="h1" sx={styles.title}>
                    User Not Found
                </Typography>
                <Typography variant="body1" sx={styles.message}>
                    It seems like your account no longer exists.
                </Typography>
                <Box sx={styles.buttons}>
                    <Link to="/" style={styles.link}>
                        <Button variant="contained" color="primary" sx={styles.button}>
                            Login
                        </Button>
                    </Link>
                    <Link to="/signup" style={styles.link}>
                        <Button variant="contained" color="secondary" sx={styles.button}>
                            Signup
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default UserNotFoundPage;
