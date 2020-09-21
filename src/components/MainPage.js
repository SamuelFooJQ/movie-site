import React, { Component } from "react";
import axios from 'axios';
import MovieTile from './MovieTile';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            resultObject: null,
            errorObject:null,
            allGenre:[],
            allYear:[],
            error:false,
            genre:"",
            productionYear:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.filterArray = this.filterArray.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
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
    clearFilters(){
        this.setState({genre:""});
        this.setState({productionYear:""});
    }
    filterArray(array, filters) {
        let cleanedFilters = {};
        let curState = this.state;
        //remove empty filters
        for(let filter in filters){
            if(curState[filter]!==""){
                cleanedFilters[filter] = filters[filter];
            }
        }
        filters = cleanedFilters;
        
        //otherwise...       
            const filterKeys = Object.keys(filters);
        return array.filter(item => {
          // validates all filter criteria
          return filterKeys.every(key => {
            // ignores non-function predicates
            if (typeof filters[key] !== 'function') return true;
            return filters[key](item[key]);
          });
        });
    }
    handleChange(event){
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
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
        let filters = {
            productionYear: prodYear => prodYear === this.state.productionYear,
            genre: genre => genre === this.state.genre
        }
        
        if(this.state.resultObject){
            resultDisplay = <>    
                
                <Paper style={{ padding: '2em', width: '80%', margin:"2em auto" }}>
                <h1>All movies</h1>
                    <Grid container spacing={1} direction="row" justify="center"  alignItems="center">
                        <Grid item xs={3} md={1}>
                            <FormControl className="formControl" margin="dense">
                                <InputLabel shrink htmlFor="genre-label-submission">
                                    Genre
                            </InputLabel>
                                <Select
                                    input={
                                        <Input name="genre" id="genre-label-submission" />
                                    }
                                    displayEmpty
                                    name="genre"
                                    value={this.state.genre}
                                    onChange={this.handleChange}
                                    data-cy="genre"
                                >
                                    <MenuItem value="">
                                        <em>All Genres</em>
                                    </MenuItem>
                                    {this.state.allGenre !== null &&
                                        this.state.allGenre.map(d => {
                                            return (
                                                <MenuItem key={`Genres-${d}`} value={d} data-cy="genreselection">
                                                    {d}
                                                </MenuItem>
                                            );
                                        })}
                                    }
                                        </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} md={1}>
                            <FormControl className="formControl" margin="dense">
                                <InputLabel shrink htmlFor="year-label-movie">
                                    year
                            </InputLabel>
                                <Select
                                    input={
                                        <Input name="year" id="year-label-movie" />
                                    }
                                    displayEmpty
                                    name="productionYear"
                                    value={this.state.productionYear}
                                    onChange={this.handleChange}
                                    data-cy="productionYear"
                                >
                                    <MenuItem value="">
                                        <em>All years</em>
                                    </MenuItem>
                                    {this.state.allYear !== null &&
                                        this.state.allYear.map(d => {
                                            return (
                                                <MenuItem key={`YearMovie-${d}`} value={d} data-cy="yearmovies">
                                                    {d}
                                                </MenuItem>
                                            );
                                        })}
                                    }
                                        </Select>
                                
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} md={1}>
                        <Button variant="outlined" onClick={this.clearFilters}>Clear Filters</Button>
                        </Grid>
                      
                    </Grid>
                </Paper>
            <Grid container justify="center"  alignItems="center" direction="row" width="100%" height="110%">
                {this.state.resultObject !== null &&
                    this.filterArray(this.state.resultObject,filters).map(d =>{
                        return(
                        <MovieTile movie={d} key={`movietile-${d.name}`}/>
                        );
                    })
                }
            </Grid> 
            {
                this.filterArray(this.state.resultObject,filters).length===0 && <h2>No movies match your criteria</h2>
            }
            </>
        }
        if(this.state.errorObj){
            resultDisplay = <h1>{this.state.errorObj.response.status + " " + this.state.errorObj.response.data.message}</h1>;
        }

        return resultDisplay;
    }
}