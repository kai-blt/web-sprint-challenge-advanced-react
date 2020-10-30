import { useState } from 'react'

export default function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessMessage(true);
    };

    return [values, showSuccessMessage, handleChanges, handleSubmit]
}


