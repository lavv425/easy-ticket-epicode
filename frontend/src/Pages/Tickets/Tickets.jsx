import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledButtonsWrapper, StyledPagesTitle, StyledPagesWrapper } from "../../Styles/Pages/Pages";
import { deleteTicket, fetchTickets } from "../../Store/Thunks/TicketsThunks";
import Button from '../../Components/UI/Button/Button';
import Table from "../../Components/UI/Table/Table";
import { useNavigate } from "react-router-dom";
import { CREATE_TICKET, EDIT_TICKET, VIEW_TICKET_BASE } from "../../Routes/Routes";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

const Tickets = () => {
    const dispatch = useDispatch();
    const { tickets } = useSelector((state) => state.tickets);

    const nav = useNavigate();

    const [selectedTicket, setSelectedTicket] = useState("");

    const headers = useMemo(() => [
        { id: 'title', label: 'Title' },
        { id: 'priority', label: 'Priority' },
        { id: 'status', label: 'Status' },
        { id: 'created_by', label: 'Created By' },
        { id: 'created_at', label: 'Creation Date' },
    ], []);

    const body = useMemo(() => tickets ? tickets : [], [tickets]);

    const onRowSelect = useCallback((selected) => {
        setSelectedTicket(selected);
    }, []);

    const handleEdit = useCallback(() => {
        nav(`${EDIT_TICKET}/${selectedTicket}`);
    }, [nav, selectedTicket]);

    const handleDelete = useCallback(() => {
        dispatch(deleteTicket(selectedTicket));
        setSelectedTicket("");
    }, [dispatch, selectedTicket]);

    const handleView = useCallback(() => {
        nav(`${VIEW_TICKET_BASE}/${selectedTicket}`);
    }, [nav, selectedTicket]);

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    return (
        <>
            <StyledPagesTitle>Tickets</StyledPagesTitle>
            <StyledPagesWrapper>
                <StyledButtonsWrapper>
                    <Button variant="contained" icon={<AddRoundedIcon />} onClick={() => nav(CREATE_TICKET)}>
                        New Ticket
                    </Button>
                    {selectedTicket && (
                        <>
                            <Button variant="contained" color="warning" icon={<BorderColorRoundedIcon />} onClick={handleEdit}>
                                Edit
                            </Button>
                            <Button variant="contained" color="secondary" icon={<VisibilityRoundedIcon />} onClick={handleView}>
                                View
                            </Button>
                        </>
                    )}
                    {selectedTicket && (
                        <Button variant="contained" icon={<DeleteRoundedIcon />} color="error" onClick={handleDelete}>
                            Delete
                        </Button>
                    )}
                </StyledButtonsWrapper>
                <Table headers={headers} body={body} selectable onRowSelect={onRowSelect} />
            </StyledPagesWrapper>
        </>
    );
};

export default Tickets;
