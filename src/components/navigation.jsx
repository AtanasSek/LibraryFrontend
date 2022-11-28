import React,{Component} from "react";
import {Link, BrowserRouter as Router} from 'react-router-dom';
import ShowBooks from "./showBooks";


class Navigation extends Component{

    render() {
        return(
            <div>
                <nav>
                    <Link to="/">Main</Link>
                    <Link to="/Add-Book">Add Book</Link>
                    <Link to="/Add-Author">Add Author</Link>
                </nav>
            </div>
        )
    }

}

export default Navigation;