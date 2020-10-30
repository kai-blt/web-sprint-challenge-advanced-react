import { useState } from 'react'

export default function useForm(initialValues) {
    //Holding state for form values and success message
    const [values, setValues] = useState(initialValues);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    //Change handler
    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    //Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessMessage(true);
    };

    return [values, showSuccessMessage, handleChanges, handleSubmit]
}


