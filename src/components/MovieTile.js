import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export default function MovieTile(props){

    const moviePosterStyle = {
        height: "20em",
        margin: "0.5em auto"
    }
    const tileStyle ={
        backGroundColor: "#fafafa",
        margin: "1em",
        padding: "1em",
        height: "100%"
    }
    const textHeight={
        background: "#efebe9",
        border: 0,
        borderRadius: 12,
        height: "8em",
        maxHeight: "8em",
        padding: "0.5em",
        marginTop: "0.5em",
        textAlign: "justify",
        overflowY: "auto",
        
    };
    return(
        <Grid item xs={12} sm={6} md={4}lg={3}xl={2}>
            
                <Paper style = {tileStyle}>              
                        <h1>{props.movie.name}</h1>
                        <img id={`movie-tile ${props.movie.name}`} style={moviePosterStyle} alt={props.movie.name}src={`/img/${props.movie.image}`}></img>
                        <h2>{props.movie.productionYear}</h2>
                        <h3>Genre: {props.movie.genre}</h3>
                        <Typography style={textHeight}>{props.movie.synopsisShort}</Typography>
                        <Link to={`/${props.movie.name}_${props.movie.productionYear}`}>Read more...</Link>
                </Paper>         
        </Grid>
    );
}