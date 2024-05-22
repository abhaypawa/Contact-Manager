import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../spinner/spinner";

const ContactList = () => {
    const [query, setQuery] = useState({ text: "" });
    const [state, setState] = useState({
        loading: false,
        contacts: [],
        filteredContacts: [],
        errorMessage: ""
    });

    useEffect(() => {
        const fetchContacts = async () => {
            setState(prevState => ({ ...prevState, loading: true }));
            try {
                const response = await fetch('http://localhost:9000/contacts');
                if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
                const data = await response.json();
                setState({
                    loading: false,
                    contacts: data,
                    filteredContacts: data,
                    errorMessage: ""
                });
            } catch (error) {
                console.error("Fetch contacts failed:", error);
                setState({
                    loading: false,
                    contacts: [],
                    filteredContacts: [],
                    errorMessage: error.message
                });
            }
        };

        fetchContacts();
    }, []);

    const clickDelete = async (contactId) => {
        try {
            const response = await fetch(`http://localhost:9000/contacts/${contactId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error(`Delete failed: ${response.status} ${response.statusText}`);
            const updatedContactsResponse = await fetch('http://localhost:9000/contacts');
            if (!updatedContactsResponse.ok) throw new Error(`Error: ${updatedContactsResponse.status} ${updatedContactsResponse.statusText}`);
            const updatedContacts = await updatedContactsResponse.json();
            setState({
                loading: false,
                contacts: updatedContacts,
                filteredContacts: updatedContacts,
                errorMessage: ""
            });
        } catch (error) {
            console.error("Delete contact failed:", error);
            setState({
                loading: false,
                contacts: [],
                filteredContacts: [],
                errorMessage: error.message
            });
        }
    };

    const searchContacts = (event) => {
        setQuery({ ...query, text: event.target.value });
        const theContacts = state.contacts.filter(contact => {
            return contact.name && contact.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setState({
            ...state,
            filteredContacts: theContacts
        });
    };

    const { loading, filteredContacts, errorMessage } = state;
    return (
        <React.Fragment>
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold">Contact Manager
                                    <Link to={'/contacts/add'} className="btn btn-primary ms-2">
                                        <i className="fa fa-plus-circle me-2" />
                                        Add contacts</Link>
                                </p>
                                <p className="fst-italic">A contact manager is a tool designed to save, view, add, edit, and delete contact information efficiently. It helps users organize and manage their contacts seamlessly for easy access and updates.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className="row">
                                    <div className="col">
                                        <div className="mb-2">
                                            <input
                                                name="text"
                                                value={query.text}
                                                onChange={searchContacts}
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Names"></input>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="submit" className="btn btn-outline-dark" value="search"></input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {loading ? <Spinner /> : (
                <React.Fragment>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <section className="contact-list">
                        <div className="container">
                            <div className="row">
                                {filteredContacts && filteredContacts.length > 0 && filteredContacts.map(contact => (
                                    <div className="col-md-6" key={contact.id}>
                                        <div className="card my-2">
                                            <div className="card-body">
                                                <div className="row align-items-center d-flex justify-content-around">
                                                    <div className="col-md-4">
                                                        <img src={contact.imageUrl} className="contact-img" alt="contact" />
                                                    </div>
                                                    <div className="col-md-7">
                                                        <ul className="list-group">
                                                            <li className="list-group-item list-group-item-action">
                                                                Name:<span className="fw-bold">{contact.name}</span>
                                                            </li>
                                                            <li className="list-group-item list-group-item-action">
                                                                Mobile:<span className="fw-bold">{contact.mobile}</span>
                                                            </li>
                                                            <li className="list-group-item list-group-item-action">
                                                                Email:<span className="fw-bold">{contact.email}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-1 d-flex flex-column align-items-center">
                                                        <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                                                            <i className="fa fa-eye" />
                                                        </Link>
                                                        <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                                            <i className="fa fa-pen" />
                                                        </Link>
                                                        <button className="btn btn-danger" onClick={() => clickDelete(contact.id)}>
                                                            <i className="fa fa-trash" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default ContactList;
