import React,{Component} from "react";
import Axios from "axios";

import {withRouter} from '../withRouter';
import {Link} from "react-router-dom";

class ShowBooks extends Component{
    state = {
        books:[],
        authors:[],
        bookName:"",
        authorName:""
    };

    componentDidMount() {
        this.getBooks();
    }

    getBooks = () =>{

        Axios.get("http://localhost:8080/ListBooks").then((res)=>{
            this.setState({books: res.data});
        })

        Axios.get("http://localhost:8080/ListAuthors").then((res)=>{
            this.setState({authors: res.data});
        })

    }

    renderBookList = () =>{
        if (this.state.books.length === 0){
            return <p>There are currently no books in the library</p>
        }
        else{
            return this.state.books.map(book=>(
                <ul>
                    <li key={book.bookId}>
                        Title: {book.bookId.name} <br/>
                        Authors: {book.bookId.authors.authorId.firstName +" "+ book.bookId.authors.authorId.lastName} <br/>
                        {/*{ book.bookId.authors.map(author=>( <li>Authors: {book.authors}</li>)) } FUTURE PROOFING FOR MULTIPLE AUTHORS*/}
                        Genre: {book.genre} <br/>


                        <Link to="/Add-Book" state={{book}}>Edit details</Link>
                        <Link onClick={(event) => this.onPressDelete(book.bookId, event)}>Remove book</Link>

                    </li>
                </ul>
            ))
        }
    }

    renderAuthorList = () =>{
        if (this.state.authors.length === 0){
            return <p>There are currently no authors registered in the library</p>
        }
        else{
            return this.state.authors.map(author=>(
                <ul>
                    <li key={author.authorId}>
                        Authors: {author.authorId.firstName +" "+ author.authorId.lastName} <br/>
                        {/*{ book.bookId.authors.map(author=>( <li>Authors: {book.authors}</li>)) } FUTURE PROOFING FOR MULTIPLE AUTHORS*/}
                        Dob: {author.dob} <br/>
                    </li>
                </ul>
            ))
        }
    }

    onPressDelete = (bookId,event) =>{

        // name: bookId.name,
        //     authors:{authorId:{firstName:bookId.authors.authorId.firstName,
        //     lastName: bookId.authors.authorId.lastName},dob:bookId.authors.authorId.dob}
        Axios.post('http://localhost:8080/DeleteBook', {
            bookId:bookId
        })
            .then( (response) =>{
                console.log(response);
                //window.location.reload(); // grdo resenie
                this.getBooks();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onSearchChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
    }

    onSearchBookSubmit = (event) =>{
        Axios.get("http://localhost:8080/getBook/q="+this.state.bookName).then((res)=>{

            this.setState({books: res.data});

        })
    }

    onSearchAuthorSubmit = (event) =>{

        Axios.get("http://localhost:8080/GetAuthor/q=" + this.state.authorName).then((res) => {

            this.setState({authors: res.data});

        })

    }


    render() {
        return(
            <div>
                <div id="bookList">
                    <label>Search books</label> <br/>
                    <input type="text" value={this.state.bookName} name="bookName" onChange={this.onSearchChange}/>
                    <button onClick={this.onSearchBookSubmit}>Search</button>

                    <h3>Current availible books: </h3>
                    {
                        <div>{this.renderBookList()}</div>
                    }
                </div>

                <div id="authorList">
                    <label>Search authors</label> <br/>
                    <input type="text" value={this.state.authorName} name="authorName" onChange={this.onSearchChange}/>
                    <button onClick={this.onSearchAuthorSubmit}>Search</button> <div id="errMsg"></div>

                    <h3>Current availible authors: </h3>
                    {
                        <div>{this.renderAuthorList()}</div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(ShowBooks);