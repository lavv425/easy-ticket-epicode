import { memo, useCallback, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Button from '../UI/Button/Button';
import { setMessage } from '../../Store/Slices/AppSlice';
import { useDispatch } from 'react-redux';
import { MAIL_REGEX, PASSWORD_REGEX } from '../../Constants/Validation';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';

const DEFAULT_FORM_MODAL_VALUES = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
};

const UserFormModal = ({ open, onClose, onSubmit, isEditing, defaultValues = null }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(DEFAULT_FORM_MODAL_VALUES);

    useEffect(() => {
        if (defaultValues) {
            setFormData({
                ...defaultValues,
                password: '', // always empty when isEditing === true
                confirm_password: '' // always empty when isEditing === true
            });
        }
    }, [defaultValues]);

    const handleChange = useCallback((field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }, []);

    const handleModalClose = useCallback(() => {
        setFormData(DEFAULT_FORM_MODAL_VALUES);

        onClose?.();
    }, [onClose]);

    const handleSubmit = useCallback(() => {
        if ((!formData.first_name || !formData.last_name || !formData.email || !formData.username) && (!isEditing && (!formData.password || !formData.confirm_password))) {
            dispatch(setMessage({ type: "error", message: "Please fill in all fields" }));
            return;
        }

        if (!MAIL_REGEX.test(formData.email)) {
            dispatch(setMessage({ type: "error", message: "Invalid email address" }));
            return;
        }

        if (!isEditing) {
            if (formData.password !== formData.confirm_password) {
                dispatch(setMessage({ type: "error", message: "Passwords do not match" }));
                return;
            }

            if (!PASSWORD_REGEX.test(formData.password)) {
                dispatch(setMessage({ type: "error", message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character" }));
                return;
            }
        }

        onSubmit?.(formData);
        handleModalClose();
    }, [dispatch, formData, isEditing, handleModalClose, onSubmit]);

    return (
        <Dialog open={open} onClose={handleModalClose} maxWidth="sm" fullWidth>
            <DialogTitle>{defaultValues ? 'Edit User' : 'New User'}</DialogTitle>
            <DialogContent className='pt-10' sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField label="Name" value={formData.first_name} onChange={handleChange('first_name')} />
                <TextField label="Surname" value={formData.last_name} onChange={handleChange('last_name')} />
                <TextField label="Email" type="email" value={formData.email} onChange={handleChange('email')} />
                <TextField label="Username" value={formData.username} onChange={handleChange('username')} />
                {!isEditing &&
                    <>
                        <TextField label="Password" type="password" value={formData.password} onChange={handleChange('password')} />
                        <TextField label="Confirm Password" type="password" value={formData.confirm_password} onChange={handleChange('confirm_password')} />
                    </>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose} icon={<UndoRoundedIcon />}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit} icon={<SaveRoundedIcon />}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default memo(UserFormModal);
