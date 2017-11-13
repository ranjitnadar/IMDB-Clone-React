import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Search from '../search/index';
import Header from '../header';
import Footer from '../footer';
import { Redirect } from 'react-router-dom';
class MovieList extends Component{
    
    constructor(props){
        super();
        this.state ={
            movies:[],
            search:'',
            userDetail:'',
            isLoggedIn:true
        };
        this.updateSearch =  this.updateSearch.bind(this);
        this.searchAction =  this.searchAction.bind(this);
        this.isLogout =  this.isLogout.bind(this);
    }
    updateSearch(newVal){
        this.setState({
            search:newVal.target.value
        })
    }
    getMovie(){
        fetch(`https://www.omdbapi.com/?apikey=fa9a7315&s=${this.state.search}&type=movie`).then((res)=> res.json())
        .then((data)=>{
           this.setState({
               movies:data.Search
           });
        })
        .catch((err)=>{
            console.error(err);
        })
    }
    searchAction(){
        return (this.state.search) ?  this.getMovie() : alert('Please enter movie title');
    }
    componentWillMount(){
       
        let getUserDetail = localStorage.getItem('userDetail'); 
        if(getUserDetail){
            this.setState({
                userDetail: JSON.parse(getUserDetail),
                isLoggedIn:true
            })
        }
       
    }
    isLogout(){
        if(window.confirm('Are you sure?')){
           // alert('asdfasd');
            localStorage.removeItem('userDetail'); 
            this.setState({
                isLoggedIn:false
            })
            this.forceUpdate();
        } 
    }
    
    render(){
        return (
            <div>
                {this.state.isLoggedIn ? 
                    <section className="fullscreen_bg">
                        <Header user={this.state.userDetail} loginStatus={this.state.isLoggedIn} isLogout={this.isLogout}/>
                        <section className="container">
                            <Search 
                                search={this.state.search}
                                detectChange={this.updateSearch}
                                searchAction={this.searchAction}
                            />
                            <div className="row movieList display-flex">
                                {
                                    this.state.movies.map((res, key) =>{
                                        return(
                                            <div className="col-xs-6 col-md-4 movieBlock" key={key}>
                                                <div className="panel panel-success">
                                                    <div className="panel-heading">
                                                        <h3 className="panel-title">
                                                            Name:{res.Title} 
                                                        </h3>
                                                    </div>
                                                    <div className="panel-body">
                                                        <img alt={res.Title} src={res.Poster} className="img-responsive"/> 
                                                    </div>
                                                    <div className="panel-footer text-center">
                                                        <Link to={"/movie/"+res.imdbID}><button className="btn btn-success btn-block"> View Detail </button></Link>  
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        )
                                    })
                                }
                            </div>
                        </section>
                        <Footer/>
                    </section>  
                :
                    <Redirect to="/login"/>
                }
                
            </div>
        );
    }
}
export default MovieList;