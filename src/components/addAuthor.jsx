import React,{Component} from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import Axios from "axios";

class AddAuthor extends Component{

    state={
        authorFName:"",
        authorLName:"",
        authorDob:""
    }

    onFormChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
    }

    postForm = (event) =>{
        event.preventDefault();

        if(this.state.authorFName === "" || this.state.authorLName === "" || this.state.authorDob === "")
        {
            document.getElementById("errMsg").hidden = false;
            document.getElementById("errMsg").innerText = "All fields must be filled.";
            return;
        }

        document.getElementById("errMsg").hidden = true;

        Axios.post('http://localhost:8080/AddAuthor', {
                authorId:
                        {firstName:this.state.authorFName,lastName:this.state.authorLName},
                    dob:this.state.authorDob
        })
            .then(function (response) {
                console.log(response);
                document.getElementById("errMsg").hidden = false;
                document.getElementById("errMsg").innerText = "Author successfully added.";
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return(
            <div>
                <form method="POST" encType="multipart/form-date" onSubmit={this.postForm}>
                    <label>Author's first name</label> <br/>
                    <input type="text" value={this.state.authorFName} name="authorFName" onChange={this.onFormChange} /> <br/>

                    <label>Author's last name</label><br/>
                    <input type="text" value={this.state.authorLName} name="authorLName" onChange={this.onFormChange} /><br/>

                    <label>Author's date of birth</label><br/>
                    <input type="date" value={this.state.authorDob} name="authorDob" onChange={this.onFormChange} /><br/>

                    <button type="submit" onSubmit={this.postForm}>Submit</button>
                </form>

                <p hidden id="errMsg"></p>
            </div>
        )
    }

}

export default AddAuthor;