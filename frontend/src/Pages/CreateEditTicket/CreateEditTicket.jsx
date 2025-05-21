import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, TextField, MenuItem } from '@mui/material';
import { TICKET_PARAMS, TICKET_PRIORITIES, TICKET_PRIORITY_LABELS, TICKET_STATUS_LABELS, TICKET_STATUSES } from '../../Constants/Constants';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../Store/Slices/AppSlice';
import { createTicket, fetchTicketDetails, updateTicket } from '../../Store/Thunks/TicketsThunks';
import { StyledPagesTitle, StyledPagesWrapper } from '../../Styles/Pages/Pages';
import Button from '../../Components/UI/Button/Button';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { isUuid } from '../../Utils/index';
import GoBackButton from '../../Components/GoBackButton/GoBackButton';

const CreateEditTicket = () => {
    const { mode, uuid } = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(TICKET_STATUSES.OPEN);
    const [priority, setPriority] = useState(TICKET_PRIORITIES.MEDIUM);

    const [currentEditingTitle, setCurrentEditingTitle] = useState();

    const isUserEditing = useMemo(() => mode === TICKET_PARAMS.EDIT, [mode]);

    const pageTitle = useMemo(() => !isUserEditing ? 'Create a new Ticket' : `Edit Ticket ${currentEditingTitle}`, [isUserEditing, currentEditingTitle]);

    const handleSubmit = useCallback(async () => {
        if (!title || !description || !status || !priority) {
            dispatch(setMessage({ type: 'error', message: 'All fields are mandatory.' }));
            return;
        };

        const newTicketData = { title, description, status, priority };

        let created = false;

        if (isUserEditing) {
            created = await dispatch(updateTicket(newTicketData, uuid));
        } else {
            created = await dispatch(createTicket(newTicketData));
        }

        if (created && !isUserEditing) {
            setTitle('');
            setDescription('');
            setStatus(TICKET_STATUSES.OPEN);
            setPriority(TICKET_PRIORITIES.MEDIUM);
        }
    }, [description, dispatch, isUserEditing, priority, status, title, uuid]);


    useEffect(() => {
        if (isUserEditing && uuid) {
            if (!isUuid(uuid)) {
                dispatch(setMessage({ type: 'error', message: 'Invalid ticket id' }));
                nav(-1);
                return;
            };

            dispatch(fetchTicketDetails(uuid)).then(({ title, description, status, priority }) => {
                setCurrentEditingTitle(title);
                setTitle(title);
                setDescription(description);
                setStatus(status);
                setPriority(priority);
            });
        }
    }, [dispatch, isUserEditing, nav, uuid]);

    return (
        <>
            <StyledPagesTitle>{pageTitle}</StyledPagesTitle>
            <GoBackButton className='back-button-ticket' />
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

                    <Button onClick={handleSubmit} variant="contained" color="primary" icon={<SaveRoundedIcon />}>
                        Save
                    </Button>
                </Box>
            </StyledPagesWrapper>
        </>
    );
};

export default CreateEditTicket;
