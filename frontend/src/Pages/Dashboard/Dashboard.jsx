import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StyledButtonsWrapper, StyledPagesTitle, StyledPagesWrapper } from '../../Styles/Pages/Pages';
import Button from '../../Components/UI/Button/Button';
import { CREATE_TICKET, USERS } from '../../Routes/Routes';
import { useEffect, useMemo } from 'react';
import { fetchDashboardTickets } from '../../Store/Thunks/TicketsThunks';
import Table from '../../Components/UI/Table/Table';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

const Dashboard = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { dashboardData } = useSelector((state) => state.tickets);

    const headers = useMemo(() => [
        { id: 'title', label: 'Title' },
        { id: 'priority', label: 'Priority' },
        { id: 'status', label: 'Status' },
        { id: 'created_by', label: 'Created By' },
        { id: 'created_at', label: 'Creation Date' },
    ], []);

    const body = useMemo(() => dashboardData.tickets ? dashboardData.tickets : [], [dashboardData.tickets]);

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
                                <Typography variant="h4">{dashboardData?.statusCounts?.open || 0}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 14, sm: 12, md: 4 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">W.I.P. Tickets</Typography>
                                <Typography variant="h4">{dashboardData?.statusCounts?.in_progress || 0}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 14, sm: 12, md: 4 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">Total Tickets</Typography>
                                <Typography variant="h4">{dashboardData?.statusCounts?.total || 0}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                    <StyledButtonsWrapper>
                        <Button variant="contained" icon={<AddRoundedIcon />} onClick={() => nav(CREATE_TICKET)}>
                            New Ticket
                        </Button>

                        <Button variant="outlined" icon={<PeopleAltRoundedIcon />} onClick={() => nav(USERS)}>
                            Manage Users
                        </Button>
                    </StyledButtonsWrapper>
                </Box>

                <Box mt={5}>
                    <Typography variant="h6" gutterBottom>
                        Last 5 Tickets
                    </Typography>

                    <Table headers={headers} body={body} paginated={false} />

                </Box>
            </StyledPagesWrapper>
        </>
    );
};

export default Dashboard;