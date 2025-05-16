import { useDispatch, useSelector } from "react-redux";
import { StyledButtonsWrapper, StyledPagesTitle, StyledPagesWrapper } from "../../Styles/Pages/Pages";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createUser, deleteUser, fetchUsers } from "../../Store/Thunks/UsersThunks";
import Button from "../../Components/UI/Button/Button";
import Table from "../../Components/UI/Table/Table";
import UserFormModal from "../../Components/UserFormModal/UserFormModal";

const Users = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const [selectedUser, setSelectedUser] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editUserData, setEditUserData] = useState(null);

    const headers = useMemo(() => [
        { id: 'first_name', label: 'Name' },
        { id: 'last_name', label: 'Surname' },
        { id: 'email', label: 'Email' },
        { id: 'username', label: 'Username' },
        { id: 'created_at', label: 'Creation Date' },
    ], []);

    const body = useMemo(() => users ? users.map((t) => ({
        uuid: t.uuid,
        first_name: t.first_name,
        last_name: t.last_name,
        email: t.email,
        username: t.username,
        created_at: t.created_at,
    })) : [], [users]);


    const onRowSelect = useCallback((selected) => {
        console.log(selected);
        setSelectedUser(selected);
    }, []);

    const handleCreate = useCallback(() => {
        setIsEditing(false);
        setEditUserData(null);
        setOpenModal(true);
    }, []);

    const handleDelete = useCallback(() => {
        dispatch(deleteUser(selectedUser));
    }, [dispatch, selectedUser]);

    const handleEdit = useCallback(() => {
        setIsEditing(true);
        setOpenModal(true);
        setEditUserData(selectedUser);
    }, [selectedUser]);

    const handleSubmitUser = useCallback((formData) => {
        dispatch(createUser(formData));
    }, [dispatch]);

    const handleModalClose = useCallback(() => {
        setOpenModal(false);
        setEditUserData(null);
        setIsEditing(false);
    }, []);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    return (
        <>
            <StyledPagesTitle>Users</StyledPagesTitle>
            <StyledPagesWrapper>
                <StyledButtonsWrapper>
                    <Button variant="contained" onClick={handleCreate}>
                        New User
                    </Button>
                    {selectedUser && (
                        <Button variant="contained" color="warning" onClick={handleEdit}>
                            Edit
                        </Button>
                    )}
                    {selectedUser && (
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Delete
                        </Button>
                    )}
                </StyledButtonsWrapper>
                <Table headers={headers} body={body} selectable onRowSelect={onRowSelect} />
            </StyledPagesWrapper>

            <UserFormModal
                open={openModal}
                onClose={handleModalClose}
                onSubmit={handleSubmitUser}
                isEditing={isEditing}
                defaultValues={editUserData}
            />
        </>
    );
};

export default Users;