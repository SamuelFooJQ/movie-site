import React, { Component } from "react";
import axios from 'axios';
import MovieTile from './MovieTile';

export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            resultObject: null,
            errorObject:null,
            allGenre:[],
            allYear:[],
            displayedMovies:null,
            error:false
        }
    }
    componentDidMount(){
        document.title = "Movies"
        //call the api endpoint for data
        let promise = this.callMovie()
        promise.then(ress=>{
            this.handlePopulate(ress);
        }).catch(err=>{
            console.log(err);
            this.setState({errorObject:true});
        })
    }
    handlePopulate(resObj){
        if(resObj){
            this.setState({resultObject:resObj});
            //get genres and years
            let genres = [];
            let years = [];
            for(let movie in resObj){
                genres.push(resObj[movie].genre);
                years.push(resObj[movie].productionYear);
            }
            //remove duplicates
            let genreSet = new Set(genres);
            let yearSet = new Set(years);
            //sort options
            genres =[...genreSet].sort();
            years = [...yearSet].sort();

            this.setState({allGenre:genres});
            this.setState({allYear: years});
        }

    }
    //retrieves movies from endpoint.
    async callMovie(){
        const url = process.env.REACT_APP_API_URL;
        const options = {
            method: "GET",
            url: url
        }
        try{
            const response = await axios(options);
            return response.data;
        }catch (error){
            this.setState({errorObj:error});
        }
    }
    render(){
        let resultDisplay = <h1>Loading...</h1>;
        if(this.state.resultObject){
            resultDisplay = <>
                <h1>All movies</h1>
                {this.state.resultObject !== null &&
                    this.state.resultObject.map(d =>{
                        return(
                        <MovieTile movie={d} key={`movietile-${d.name}`}/>
                        );
                    })
                }
            </>
        }
        if(this.state.errorObj){
            resultDisplay = "Error Encountered. See log for details.";
        }

        return resultDisplay;
    }
}