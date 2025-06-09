import { useNavigate, useParams } from "react-router-dom";
import { StyledPagesTitle, StyledPagesWrapper } from "../../Styles/Pages/Pages";
import { useEffect, useState } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import { isUuid } from "../../Utils";
import { useDispatch } from "react-redux";
import { setMessage } from "../../Store/Slices/AppSlice";
import { fetchTicketDetails } from "../../Store/Thunks/TicketsThunks";
import { TICKET_PRIORITY_LABELS, TICKET_STATUS_LABELS } from "../../Constants/Constants";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";

const ViewTicket = () => {
    const { uuid } = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        // if the uuid is not a valid uuid, redirect to the previous page
        if (!isUuid(uuid)) {
            dispatch(setMessage({ type: 'error', message: 'Invalid ticket id' }));
            nav(-1);
            return;
        };

        dispatch(fetchTicketDetails(uuid, true)).then((ticket) => setTicket(ticket));
    }, [dispatch, nav, uuid]);

    return (
        <>
            <StyledPagesTitle>View Ticket</StyledPagesTitle>
            <GoBackButton className='back-button-ticket' />
            <StyledPagesWrapper>
                <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
                    <Typography variant="h5" gutterBottom>
                        {ticket?.title}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">Descrizione:</Typography>
                        <Typography>{ticket?.description}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">Stato:</Typography>
                        <Typography>{TICKET_STATUS_LABELS[ticket?.status]}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">Priorità:</Typography>
                        <Typography>{TICKET_PRIORITY_LABELS[ticket?.priority]}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" color="text.secondary">Creato il:</Typography>
                        <Typography>{ticket?.created_at}</Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">Creato da:</Typography>
                        <Typography>{ticket?.created_by}</Typography>
                    </Box>
                </Paper>
            </StyledPagesWrapper>
        </>
    );
};

export default ViewTicket;