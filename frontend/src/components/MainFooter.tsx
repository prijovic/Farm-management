import React from "react";
import {Box, Container, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const MainFooter: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 6,
            }}
            component="footer"
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    {"Copyright © "}
                    <Link color="inherit" to={"/"}>
                        Lilly021
                    </Link>{" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
            </Container>
        </Box>
    );
};
