import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/Contactservice";

let AddContact = () => {
    let navigate = useNavigate();
    let [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            imageUrl: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups: [],
        errorMessage: ''
    });

    let updateInput = (event) => {
        setState((prevState) => ({
            ...prevState,
            contact: {
                ...prevState.contact,
                [event.target.name]: event.target.value
            }
        }));
    };

    useEffect(() => {
        const fetchGroups = async () => {
            setState((prevState) => ({ ...prevState, loading: true }));
            try {
                let response = await ContactService.getGroups();
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                    groups: response.data
                }));
            } catch (error) {
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                    errorMessage: 'Failed to fetch groups'
                }));
                console.error("Failed to fetch groups", error);
            }
        };

        fetchGroups();
    }, []);

    let submitForm = async (event) => {
        event.preventDefault();
        try {
            let response = await ContactService.createContact(state.contact);
            if (response && response.data) {
                navigate('/contacts/list', { replace: true });
            } else {
                setState((prevState) => ({
                    ...prevState,
                    errorMessage: 'Failed to create contact'
                }));
            }
        } catch (error) {
            setState((prevState) => ({
                ...prevState,
                errorMessage: error.message
            }));
            console.error("Failed to create contact", error);
        }
    };

    let { contact, groups, errorMessage } = state;
    return (
        <React.Fragment>
            <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success fw-bold">Create Contact</p>
                            <p className="fst-italic">A contact manager is a tool designed to save, view, add, edit, and delete contact information efficiently. It helps users organize and manage their contacts seamlessly for easy access and updates.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input
                                        required
                                        name='name'
                                        value={contact.name}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required
                                        name='imageUrl'
                                        value={contact.imageUrl}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Photo Url" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required
                                        name='mobile'
                                        value={contact.mobile}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder="Mobile" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required
                                        name='email'
                                        value={contact.email}
                                        onChange={updateInput}
                                        type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required
                                        name='company'
                                        value={contact.company}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Company" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required
                                        name='title'
                                        value={contact.title}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Title" />
                                </div>
                                <div className="mb-2">
                                    <select
                                        required
                                        name='groupId'
                                        value={contact.groupId}
                                        onChange={updateInput}
                                        className="form-control">
                                        <option value="">Select a group</option>
                                        {groups.length > 0 && groups.map(group => {
                                            return (
                                                <option key={group.id} value={group.id}>{group.name}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-success" value="Create" />
                                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                                </div>
                            </form>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        </div>
                    </div>
                </div>  
            </section>
        </React.Fragment>
    );
};

export default AddContact;
