import React, { Component } from "react";
import axios from 'axios';
import MovieTile from './MovieTile';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            resultObject: null,
            errorObject:null,
            allGenre:[],
            allYear:[],
            displayedMovies:null,
            error:false,
            genre:"",
            year:""
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

                {/*
                <React.Fragment>
                <Paper style={{ padding: '2em', width: '100%' }}>
                    <ContainerHeader>Sort movies</ContainerHeader>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl className="formControl" margin="dense">
                                <InputLabel shrink htmlFor="genre-label-submission">
                                    genre
                            </InputLabel>
                                <Select
                                    input={
                                        <Input name="genre" id="genre-label-submission" />
                                    }
                                    displayEmpty
                                    name="genre"
                                    disabled={this.state.genre === ""}
                                    onClick={this.state.genre === "" && (() => this.openMessageBox("Please select your course!"))}
                                    value={this.state.genre}
                                    onChange={this.handleChange}
                                    data-cy="genre"
                                >
                                    <MenuItem value="">
                                        <em>Select genre</em>
                                    </MenuItem>
                                    {allGenre !== null &&
                                        allGenre.map(d => {
                                            return (
                                                <MenuItem key={`AssnPastSub-${d}`} value={d} data-cy="practice">
                                                    {d}
                                                </MenuItem>
                                            );
                                        })}
                                    }
                                        </Select>
                                <FormHelperText>Select Year</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className="formControl" margin="dense">
                                <InputLabel shrink htmlFor="year-label-submission">
                                    year
                            </InputLabel>
                                <Select
                                    input={
                                        <Input name="year" id="year-label-submission" />
                                    }
                                    displayEmpty
                                    name="year"
                                    disabled={this.state.course === ""}
                                    onClick={this.state.course === "" && (() => this.openMessageBox("Please select your course!"))}
                                    value={year}
                                    onChange={this.handleChange}
                                    data-cy="year"
                                >
                                    <MenuItem value="">
                                        <em>Select year</em>
                                    </MenuItem>
                                    {allYear !== null &&
                                        allYear.map(d => {
                                            return (
                                                <MenuItem key={`AssnPastSub-${d}`} value={d} data-cy="practice">
                                                    {d}
                                                </MenuItem>
                                            );
                                        })}
                                    }
                                        </Select>
                                <FormHelperText>Select Year</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
                {anyResult ? <Analysis result={anyResult} reqID={this.state.requestID} /> : status}
                <MessageBox open={this.state.messsageBox} handleClose={this.closeMessageBox} title="Caution" message={this.state.messsage}></MessageBox>
            </React.Fragment>
            */}
                
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