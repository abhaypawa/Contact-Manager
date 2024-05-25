import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/Contactservice";

let EditContact = () => {
    let { contactId } = useParams();
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
        const fetchContact = async () => {
            setState((prevState) => ({ ...prevState, loading: true }));
            try {
                let response = await ContactService.getContact(contactId);
                let groupResponse = await ContactService.getGroups();
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                    contact: response.data,
                    groups: groupResponse.data
                }));
            } catch (error) {
                setState((prevState) => ({
                    ...prevState,
                    loading: false,
                    errorMessage: 'Failed to fetch contact or groups'
                }));
                console.error("Failed to fetch contact or groups", error);
            }
        };

        fetchContact();
    }, [contactId]);

    let submitForm = async (event) => {
        event.preventDefault();
        try {
            let response = await ContactService.updateContact(state.contact, contactId);
            if (response) {
                navigate('/contacts/list', { replace: true });
            }
            console.log(contact)

        } catch (error) {
            setState({ ...state, errorMessage: error.message });
            navigate(`/contacts/edit/${contactId}`, { replace: false });
        }
    };

    let {  contact, groups} = state;
    return (
        <React.Fragment>
            <section className="edit-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-primary fw-bold">Edit Contact</p>
                            <p className="fst-italic">A contact manager is a tool designed to save, view, add, edit, and delete contact information efficiently. It helps users organize and manage their contacts seamlessly for easy access and updates.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='name'
                                        value={contact.name}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='imageUrl'
                                        value={contact.imageUrl}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Photo Url" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='mobile'
                                        value={contact.mobile}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder="Mobile" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='email'
                                        value={contact.email}
                                        onChange={updateInput}
                                        type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='company'
                                        value={contact.company}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Company" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='title'
                                        value={contact.title}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Title" />
                                </div>
                                <div className="mb-2">
                                    <select
                                        required={true}
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
                                    <input type="submit" className="btn btn-primary" value="Update" />
                                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default EditContact;
