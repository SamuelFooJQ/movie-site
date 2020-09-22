import { Typography } from '@material-ui/core';
//this component will get rendered by the movie route component.
import React from 'react';
import {Link} from 'react-router-dom';

export default function Movie(props){
    let movie = props.details;

    const moviePosterStyle = {
        height: "30em",
        margin: "0.5em auto"
    }

    const textHeight={
        background: "#efebe9",
        border: 0,
        borderRadius: 12,
        padding: "0.5em",
        margin: '1em',
        overflowY: "auto",
        
    };

    return(
            <>
                <h1>{movie.name}</h1>
                <h2>{movie.productionYear}</h2>
                <Link className="back" to="/"><p>Back to Movies</p></Link>
                <img id={`movie-tile ${movie.name}`} style={moviePosterStyle} alt={movie.name}src={`/img/${movie.image}`}></img>

                <h3>Synopsis</h3>
                <Typography style={textHeight}> <div dangerouslySetInnerHTML={{__html: movie.synopsis}}></div></Typography>
            </>
    );
}