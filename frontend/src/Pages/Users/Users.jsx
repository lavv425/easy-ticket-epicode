import { useDispatch, useSelector } from "react-redux";
import { StyledButtonsWrapper, StyledPagesTitle, StyledPagesWrapper } from "../../Styles/Pages/Pages";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createUser, deleteUser, fetchUser, fetchUsers, updateUser } from "../../Store/Thunks/UsersThunks";
import Button from "../../Components/UI/Button/Button";
import Table from "../../Components/UI/Table/Table";
import UserFormModal from "../../Components/UserFormModal/UserFormModal";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Users = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const [selectedUser, setSelectedUser] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editUserData, setEditUserData] = useState(null);
    const tableRef = useRef();

    const headers = useMemo(() => [
        { id: 'first_name', label: 'Name' },
        { id: 'last_name', label: 'Surname' },
        { id: 'email', label: 'Email' },
        { id: 'username', label: 'Username' },
        { id: 'created_at', label: 'Creation Date' },
    ], []);

    const body = useMemo(() => users ? users : [], [users]);


    const onRowSelect = useCallback((selected) => {
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

        dispatch(fetchUser(selectedUser)).then((user) => {
            setEditUserData(user);
        });
    }, [dispatch, selectedUser]);

    const handleResetSelection = useCallback(() => {
        setSelectedUser("");
        tableRef.current?.resetSelection();
    }, []);

    const handleModalClose = useCallback(() => {
        setOpenModal(false);
        setEditUserData(null);
        setIsEditing(false);
        handleResetSelection();
    }, [handleResetSelection]);

    const handleSubmitUser = useCallback((formData) => {
        if (isEditing) {
            dispatch(updateUser(formData, selectedUser));
        } else {
            dispatch(createUser(formData));
        }

        handleModalClose();
    }, [dispatch, handleModalClose, isEditing, selectedUser]);


    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    return (
        <>
            <StyledPagesTitle>Users</StyledPagesTitle>
            <StyledPagesWrapper>
                <StyledButtonsWrapper>
                    <Button variant="contained" icon={<AddRoundedIcon />} onClick={handleCreate}>
                        New User
                    </Button>
                    {selectedUser && (
                        <Button variant="contained" color="warning" icon={<BorderColorRoundedIcon />} onClick={handleEdit}>
                            Edit
                        </Button>
                    )}
                    {selectedUser && (
                        <Button variant="contained" color="error" icon={<DeleteRoundedIcon />} onClick={handleDelete}>
                            Delete
                        </Button>
                    )}
                </StyledButtonsWrapper>
                <Table ref={tableRef} headers={headers} body={body} selectable onRowSelect={onRowSelect} />
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