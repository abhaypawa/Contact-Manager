import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/Contactservice";
import Spinner from "../../spinner/spinner";


let ContactList = () =>{
    let[query, setQuery] = useState({
        text:""

    })
    let [state, setState] = useState({
        loading: false,
        contacts:[],
        filteredContacts :[],
        errorMessage:""
    })
    useEffect(() => {
        const fetchContacts = async () => {
            setState(prevState => ({ ...prevState, loading: true }));
            try {
                let response = await ContactService.getAllContacts();
                setState({
                    loading: false,
                    contacts: response.data,
                    filteredContacts:response.data,
                    errorMessage: ""
                });
            } catch (error) {
                setState({
                    loading: false,
                    contacts: [],
                    errorMessage: error.message
                });
            }
        };

        fetchContacts();
    }, []);

    let  clickDelete =async(contactId)=>{
       
        try {
            let response = await ContactService.deletContact(contactId)
            if(response){
                setState(prevState => ({ ...prevState, loading: true }));
                let response = await ContactService.getAllContacts();
                setState({
                    loading: false,
                    contacts: response.data,
                    filteredContacts:response.data,
                    errorMessage: ""
                });

            }
        } catch (error) {
            setState({
                loading: false,
                contacts: [],
                errorMessage: error.message
            });
        }
    }   
// search contacts
    // let searchContacts = (event)=>{
    //     setQuery({...query, text:event.target.value})
    //     let theContacts = state.contacts.filter(contact=>{
    //         return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    //     })
    //     setState({
    //         ...state,
    //         filteredContacts:theContacts
    //     })
    // }

let {loading, contacts,filteredContacts, errorMessage} = state;
    return(
        <React.Fragment>
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold">Contact Manager
                                <Link to={'/contacts/add'} className="btn btn-primary ms-2">
                                    <i className="fa fa-plus-circle me-2"/>
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
                                        // onChange={searchContacts}
                                        type="text" className="form-control" placeholder="Search Names"></input>
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
            
            
            {
                loading ? <Spinner/> : <React.Fragment>

                <section className="contact-list">
                <div className="container">
                    <div className="row">
                        {
                            filteredContacts.length > 0 &&
                            filteredContacts.map(contacts=>{
                                return(
                                    <div className="col-md-6" key={contacts.id}>
                                    <div className="card my-2" >
                                        <div className="card-body">
                                           <div className="row align-items-center d-flex justify-content-around " >
                                           <div className="col-md-4">
                                                <img src= {contacts.imageUrl} className= "contact-img"></img>
                                                
                                            </div>
                                            <div className="col-md-7">
                                                <ul className="list-group">
                                                    <li className="list-group-item list-group-item-action">
                                                        Name:<span className="fw-bold">{contacts.name}</span>
                                                        </li>
                                                        <li className="list-group-item list-group-item-action">
                                                        Mobile:<span className="fw-bold">{contacts.mobile}</span>
                                                        </li>
                                                        <li className="list-group-item list-group-item-action">
                                                        Email:<span className="fw-bold">{contacts.email}</span>
                                                        </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-1 d-flex flex-column align-items-center">
                                                <Link to={`/contacts/view/${contacts.id}`}className="btn btn-warning my-1">
                                                    <i className="fa fa-eye"/>
                                                </Link>
                                                <Link to={`/contacts/edit/${contacts.id}`}className="btn btn-primary my-1">
                                                    <i className="fa fa-pen"/>
                                                </Link>
                                                <button className="btn btn-danger" onClick={()=>clickDelete(contacts.id)}>
                                                    <i className="fa fa-trash"/>
                                                </button>
        
                                            </div>
        
        
                                           </div>
        
                                        </div>
                                    </div>
        
                                </div>
                               

                                )
                            })
                        }
             
                    </div>
                </div>

            </section>
                
                </React.Fragment>
            }
</React.Fragment>
            
            
        
    )
};

export default ContactList;