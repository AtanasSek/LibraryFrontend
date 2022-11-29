import React,{Component} from "react";
import Axios from "axios";
import {useLocation} from "react-router-dom";
import {withRouter} from '../withRouter';
import * as events from "events";

class AddBook extends Component{

    state = {
        bookTitle: "",
        bookGenre: "",
        authorName: "",
        book:""
    }


    componentDidMount() {

        if(this.props.location.state !== null){
            const b = this.props.location.state.book;
            console.log(b.bookId.authors.authorId.fullName)

            this.setState({bookTitle:b.bookId.name})
            this.setState({bookGenre:b.genre})
            this.setState({authorName:b.bookId.authors.authorId.firstName + " " + b.bookId.authors.authorId.lastName})
        }

    }

    postForm = (event) =>{
        event.preventDefault();

        if(this.state.bookTitle === "" || this.state.bookGenre === "" || this.state.authorName === "")
        {
            document.getElementById("errMsg").hidden = false;
            document.getElementById("errMsg").innerText = "All fields must be filled.";
            return;
        }

        document.getElementById("errMsg").hidden = true;

        let fName = this.state.authorName.split(" ")[0];
        let lName = this.state.authorName.split(" ")[1];

        Axios.post('http://localhost:8080/AddBook', {
            bookId: {name: this.state.bookTitle, authors: {authorId: {firstName: fName, lastName: lName}}},
            genre: this.state.bookGenre
        })
            .then(function (response) {
                console.log(response);
                document.getElementById("errMsg").hidden = false;
                document.getElementById("errMsg").innerText = "Book successfully added.";
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    onFormChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
    }



    render(){
        return(
            <div>
                <form method="POST" encType="multipart/form-date" onSubmit={this.postForm}>
                    <label>Title</label> <br/>
                    <input type="text" value={this.state.bookTitle} name="bookTitle" onChange={this.onFormChange} /> <br/>
                    <label>Author's name</label><br/>
                    <input type="text" value={this.state.authorName} name="authorName" onChange={this.onFormChange} /><br/>
                    <div onChange={this.onFormChange}>
                        <label>Genre</label><br/>
                        <input type="radio" value={"fiction"} name="bookGenre"  /> Fiction <br/>
                        <input type="radio" value={"nonfiction"} name="bookGenre"  /> Non-Fiction <br/>
                    </div>

                    <button type="submit" onSubmit={this.postForm}>Submit</button>
                </form>

                <p hidden id="errMsg"></p>
            </div>
        )
    }

}

export default withRouter(AddBook);