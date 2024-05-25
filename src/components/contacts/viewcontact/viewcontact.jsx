import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../services/Contactservice";
import Spinner from "../../spinner/spinner";

let ViewContact = () => {
    let { contactId } = useParams();

    let [state, setState] = useState({
        loading: false,
        contact: {},
        errorMessage: ''
    });

    useEffect(() => {
        const fetchContact = async () => {
            setState({ ...state, loading: true });
            try {
                let response = await ContactService.getContact(contactId);
                setState({
                    ...state,
                    loading: false,
                    contact: response.data
                });
            } catch (error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: 'Failed to fetch contact'
                });
                console.error("Failed to fetch contact", error);
            }
        };

        fetchContact();
    }, [contactId]);

    let { loading, contact} = state;
    return (
        <React.Fragment>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View Contact</p>
                            <p className="fst-italic">A contact manager is a tool designed to save, view, add, edit, and delete contact information efficiently. It helps users organize and manage their contacts seamlessly for easy access and updates.</p>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? <Spinner /> : 
                <section className="view-contact mt-3">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <img src={contact.imageUrl} alt="" className="img-fluid contact-img" />
                            </div>
                            <div className="col-md-8">
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
                                    <li className="list-group-item list-group-item-action">
                                        Group: <span className="fw-bold">{contact.group ? contact.group.name : 'No Group'}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4 d-flex flex-column align-items-center">
                                <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                    <i className="fa fa-pen" />
                                </Link>
                                <Link to={`/contacts/list`} className="btn btn-dark my-1">
                                    <i className="fa fa-arrow-left" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </React.Fragment>
    );
};

export default ViewContact;
