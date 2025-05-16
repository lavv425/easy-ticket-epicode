import { useCallback, useState } from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { TICKET_PRIORITIES, TICKET_PRIORITY_LABELS, TICKET_STATUS_LABELS, TICKET_STATUSES } from '../../Constants/Constants';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../Store/Slices/AppSlice';
import { createTicket } from '../../Store/Thunks/TicketsThunks';
import { StyledPagesTitle, StyledPagesWrapper } from '../../Styles/Pages/Pages';
import Button from '../../Components/UI/Button/Button';

const CreateTicket = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(TICKET_STATUSES.OPEN);
    const [priority, setPriority] = useState(TICKET_PRIORITIES.MEDIUM);

    const handleSubmit = useCallback(() => {
        if (!title || !description || !status || !priority) {
            dispatch(setMessage({ type: 'error', message: 'All fields are mandatory.' }));
            return;
        };

        const newTicketData = { title, description, status, priority };

        dispatch(createTicket(newTicketData));
    }, [description, dispatch, priority, status, title]);

    return (
        <>
            <StyledPagesTitle>Create a new Ticket</StyledPagesTitle>
            <StyledPagesWrapper>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                    <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={4} fullWidth />
                    <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        {Object.entries(TICKET_STATUS_LABELS).map(([key, label]) => (
                            <MenuItem key={key} value={key}>{label}</MenuItem>
                        ))}
                    </TextField>
                    <TextField select label="Priorità" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        {Object.entries(TICKET_PRIORITY_LABELS).map(([key, label]) => (
                            <MenuItem key={key} value={key}>{label}</MenuItem>
                        ))}
                    </TextField>

                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Save
                    </Button>
                </Box>
            </StyledPagesWrapper>
        </>
    );
};

export default CreateTicket;
