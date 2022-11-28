import React,{Component} from "react";
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import ShowBooks from "./showBooks";
import Navigation from "./navigation";
import AddBook from "./addBook";
import AddAuthor from "./addAuthor";
import "../styles/style.css";


class Main extends Component{

    render() {
        return(
            <div>
                <Router>
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={<ShowBooks/>}></Route>
                        <Route path="/Add-Book" element={<AddBook/>}>Add Book</Route>
                        <Route path="/Add-Author" element={<AddAuthor/>}>Create Author</Route>
                    </Routes>
                </Router>


            </div>
        )
    }

}

export default Main;