import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import { Redirect } from 'react-router-dom';
class MovieDetail extends Component {
    constructor(props){
        super();
        this.state ={
            movie:{},
            isLoggedIn:false,
            movieId:props.match.params.movieId,
            validMovieId:false
        }
        this.isLogout =  this.isLogout.bind(this);
    }
    componentWillMount(){
        let getUserDetail = localStorage.getItem('userDetail'); 
        if(getUserDetail){
            this.setState({
                userDetail: JSON.parse(getUserDetail),
                isLoggedIn:true
            })
        }
        fetch(`https://www.omdbapi.com/?apikey=fa9a7315&i=${this.state.movieId}`).then((res)=> res.json())
        .then((data)=>{
          if(data.Response === "True"){
            this.setState({
                    movie:data,
                    validMovieId:true
            });
          }else{
            this.setState({
                validMovieId:false
            });  
          }
         
        })
        .catch((err)=>{
            console.error(err);
            this.setState({
                validMovieId:false
            });
        })
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
    render() {
        const state =  this.state;
        return (
            <div>
            {state.isLoggedIn ? 
                
                <section className="fullscreen_bg">
                    <Header user={this.state.userDetail} loginStatus={this.state.isLoggedIn} isLogout={this.isLogout}/>
                    {state.validMovieId ?
                    <div className="container">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <img src={state.movie.Poster} alt={state.movie.Title} className="img-responsive" />
                        </div>
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            <div>
                                
                                <div className="row">
                                    <div className="col-xs-12">
                                    <h1 className="text-left">{state.movie.Title}</h1>
                                        <h3>
                                            Director : {state.movie.Director}
                                        </h3>
                                    </div>
                                    <div className="col-xs-12">
                                        <h3>
                                            Language : {state.movie.Language}
                                        </h3>
                                    </div>
                                    <div className="col-xs-12">
                                        <h3>
                                            Genre : {state.movie.Genre}
                                        </h3>
                                    </div>
                                    <div className="col-xs-12">
                                        <h3>
                                            Released : {state.movie.Released}
                                        </h3>
                                    </div>
                                    <div className="col-xs-12">
                                        <h3>
                                            Actors : {state.movie.Actors}
                                        </h3>
                                    </div>
                                    
                                </div>
                                
                                <div className="row">
                                    <div>
                                        <h3>Overview</h3>
                                        <p>{state.movie.Plot}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    :
                    <div  className="container text-center">
                        <h1>Oops Invalid Detail.</h1>
                    </div>}
                    <Footer/>
                </section>
            :
                <Redirect to="/login"/>  
            }
            </div>
        )
    }
}

export default MovieDetail;