import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Grid, Card, CardContent, Divider, TableHead, TableRow, TableCell, Table, Paper, TableBody } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledButtonsWrapper, StyledPagesTitle, StyledPagesWrapper } from '../../Styles/Pages/Pages';
import Button from '../../Components/UI/Button/Button';
import { CREATE_TICKET, USERS } from '../../Routes/Routes';
import { useEffect } from 'react';
import { fetchDashboardTickets } from '../../Store/Thunks/TicketsThunks';

const Dashboard = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { dashboardData } = useSelector((state) => state.tickets);

    useEffect(() => {
        dispatch(fetchDashboardTickets());
    }, [dispatch]);

    return (
        <>
            <StyledPagesTitle>Dashboard</StyledPagesTitle>
            <StyledPagesWrapper>
                <Grid container spacing={1}>
                    {/* Card statistiche */}
                    <Grid size={{ xs: 14, sm: 12, md: 4 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">Open Tickets</Typography>
                                <Typography variant="h4">{dashboardData?.open || 0}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 14, sm: 12, md: 4 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">W.I.P. Tickets</Typography>
                                <Typography variant="h4">{dashboardData?.in_progress || 0}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 14, sm: 12, md: 4 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">Total Tickets</Typography>
                                <Typography variant="h4">{dashboardData?.total || 0}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>Fast Actions</Typography>
                    <StyledButtonsWrapper>
                        <Button variant="contained" onClick={() => nav(CREATE_TICKET)}>
                            New Ticket
                        </Button>

                        <Button variant="outlined" onClick={() => nav(USERS)}>
                            Manage Users
                        </Button>
                    </StyledButtonsWrapper>
                </Box>

                <Box mt={5}>
                    <Typography variant="h6" gutterBottom>
                        Last 5 Tickets
                    </Typography>

                    <Paper variant="outlined">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Titolo</TableCell>
                                    <TableCell>Stato</TableCell>
                                    <TableCell>Priorità</TableCell>
                                    <TableCell>Data creazione</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dashboardData?.tickets?.map((ticket) => (
                                    <TableRow key={ticket.uuid}>
                                        <TableCell>{ticket.title}</TableCell>
                                        <TableCell>{ticket.status}</TableCell>
                                        <TableCell>{ticket.priority}</TableCell>
                                        <TableCell>{ticket.created_at}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Box>
            </StyledPagesWrapper>
        </>
    );
};

export default Dashboard;