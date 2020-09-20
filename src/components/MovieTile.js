import React from 'react';
export default function MovieTile(props){

    const moviePosterStyle = {
        height: '20em',
        margin: "0.5em auto"
    }
    const tileStyle ={
        width: "25%",
        backGroundColor: "#fafafa",
        margin: "5em",
        float: "left"
    }
    return(
        <div style = {tileStyle}>
            <h1>{props.movie.name}</h1>
            <img id={`movie-tile ${props.movie.name}`} style={moviePosterStyle} alt={props.movie.name}src={`/img/${props.movie.image}`}></img>
            <h2>{props.movie.productionYear}</h2>
            <h3>Genre: {props.movie.genre}</h3>
            <p>{props.movie.synopsisShort}</p>
        </div>
    );
}