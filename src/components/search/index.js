import React from 'react';

const Search = (props) =>{
    return(
        <section className="input-group searchContainer">
             <input type="text" className="form-control" value={props.search} onChange={props.detectChange} id="exampleInputAmount" placeholder="Search Movie " />
             <div className="input-group-addon searchbtn" onClick={props.searchAction} > <i className="glyphicon glyphicon-search"></i> Search</div>
        </section>
    )
}

export default Search;
