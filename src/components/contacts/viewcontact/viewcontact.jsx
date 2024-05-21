import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../services/Contactservice";
import Spinner from "../../spinner/spinner";

let ViewContact = () =>{
    let {contactId} = useParams();
    let [state, setState] = useState({
        loading:false,
        contact:{},
        errorMessage:'',
        group:{}

    })
    useEffect(()=>{
        const fetchContact = async()=>{
            setState(prevState =>({...prevState, loading:true}))

       
        try {
           
            let response = await ContactService.getContact(contactId)
            let groupResponse = await ContactService.getGroup(response.data)
            setState({
               loading: false,
               contact:response.data,
               group: groupResponse.data,
               errorMessage:""
            })
            
        } catch (error) {
            setState({
                loading: false,
                contact:[],
                errorMessage:error.message
            })
        }
        }
        fetchContact();
    },[contactId])
    let {contact, loading, errorMessage, group} = state
    return(
        <React.Fragment>
            <section className="view-contact-intro p-3 ">
                <div className="container">
                    <div className="row align-items-center ">
                        <div className="col">
                            <p className="h3 text-warning fw-bold ">View Contact</p>
                            <p className="fst-italic">A contact manager is a tool designed to save, view, add, edit, and delete contact information efficiently. It helps users organize and manage their contacts seamlessly for easy access and updates.</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading? <Spinner/> : 
                    <React.Fragment>
                         <section className="view-contact mt-3 ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={contact.imageUrl}className="contact-img"/>

                        </div>
                            <div className="col-md-8">
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
                                                <li className="list-group-item list-group-item-action">
                                                Company:<span className="fw-bold">{contact.company}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-action">
                                                Title:<span className="fw-bold">{contact.title}</span>
                                                </li>
                                                <li className="list-group-item list-group-item-action">
                                                Group:<span className="fw-bold">{group.name}</span>
                                                </li>
                                        </ul>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Link to={'/contacts/list'} className="btn btn-dark">Back</Link>
                        </div>

                    </div>
                </div>

            </section>
        
                    </React.Fragment>
            }
           
        </React.Fragment>
    )
};

export default ViewContact;