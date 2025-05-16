import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledButtonsWrapper, StyledPagesTitle, StyledPagesWrapper } from "../../Styles/Pages/Pages";
import { deleteTicket, fetchTickets } from "../../Store/Thunks/TicketsThunks";
import Button from '../../Components/UI/Button/Button';
import Table from "../../Components/UI/Table/Table";
import { useNavigate } from "react-router-dom";
import { CREATE_TICKET } from "../../Routes/Routes";

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

    const body = useMemo(() => tickets ? tickets.map((t) => ({
        uuid: t.uuid,
        title: t.title,
        priority: t.priority,
        status: t.status,
        created_by: t.created_by,
        created_at: t.created_at,
    })) : [], [tickets]);

    const onRowSelect = useCallback((selected) => {
        setSelectedTicket(selected);
    }, []);

    const handleDelete = useCallback(() => {
        dispatch(deleteTicket(selectedTicket));
        setSelectedTicket("");
    }, [dispatch, selectedTicket]);

    const handleEdit = useCallback(() => { }, []);


    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    return (
        <>
            <StyledPagesTitle>Tickets</StyledPagesTitle>
            <StyledPagesWrapper>
                <StyledButtonsWrapper>
                    <Button variant="contained" onClick={() => nav(CREATE_TICKET)}>
                        New Ticket
                    </Button>
                    {selectedTicket && (
                        <Button variant="contained" color="warning" onClick={handleDelete}>
                            Delete
                        </Button>
                    )}
                    {selectedTicket && (
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Edit
                        </Button>
                    )}
                </StyledButtonsWrapper>
                <Table headers={headers} body={body} selectable onRowSelect={onRowSelect} />
            </StyledPagesWrapper>
        </>
    );
};

export default Tickets;
