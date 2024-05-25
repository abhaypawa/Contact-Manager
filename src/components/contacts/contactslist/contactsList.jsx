import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/Contactservice";
import Spinner from "../../spinner/spinner";

let ContactList = () => {
    let [query, setQuery] = useState({ text: "" });
    let [state, setState] = useState({
        loading: false,
        contacts: [],
        filteredContacts: [],
        errorMessage: ""
    });

    useEffect(() => {
        const fetchContacts = async () => {
            setState(prevState => ({ ...prevState, loading: true }));
            try {
                let response = await ContactService.getAllContacts();
                setState({
                    loading: false,
                    contacts: response.data,
                    filteredContacts: response.data,
                    errorMessage: ""
                });
            } catch (error) {
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

    let clickDelete = async (contactId, event) => {
        event.preventDefault(); // Prevent form submission
        try {
            let response = await ContactService.deleteContact(contactId);
            if (response) {
                setState(prevState => ({ ...prevState, loading: true }));
                let response = await ContactService.getAllContacts();
                setState({
                    loading: false,
                    contacts: response.data,
                    filteredContacts: response.data,
                    errorMessage: ""
                });
            }
            console.log(contactId)
        } catch (error) {
            setState({
                loading: false,
                contacts: [],
                filteredContacts: [],
                errorMessage: error.message
            });
        }
    };

    let searchContacts = (event) => {
        setQuery({ ...query, text: event.target.value });
        let theContacts = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setState({
            ...state,
            filteredContacts: theContacts
        });
    };

    let { loading, filteredContacts } = state;
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
                                                type="text" className="form-control" placeholder="Search names" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="submit" className="btn btn-outline-dark" value="Search" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? <Spinner /> :
                <React.Fragment>
                    <section className="contact-list">
                        <div className="container">
                            <div className="row">
                                {filteredContacts.length > 0 &&
                                    filteredContacts.map(contact => {
                                        return (
                                            <div className="col-md-6" key={contact.id}>
                                                <div className="card my-2">
                                                    <div className="card-body">
                                                        <div className="row align-items-center d-flex justify-content-around">
                                                            <div className="col-md-4">
                                                                <img src={contact.imageUrl} alt="" className="img-fluid contact-img" />
                                                            </div>
                                                            <div className="col-md-7">
                                                                <ul className="list-group">
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Name: <span className="fw-bold">{contact.name}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Mobile: <span className="fw-bold">{contact.mobile}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Email: <span className="fw-bold">{contact.email}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Company: <span className="fw-bold">{contact.company}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Title: <span className="fw-bold">{contact.title}</span>
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
                                                                <button className="btn btn-danger my-1" type="button" onClick={(e) => clickDelete(contact.id, e)}>
                                                                    <i className="fa fa-trash" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default ContactList;
