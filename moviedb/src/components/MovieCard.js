import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, CardActionArea, Rating} from '@mui/material';

const MovieCard = ({movie}) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="400"
                    image={movie.image}
                    alt="Movie picture"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.title}
                    </Typography>
                    <Box sx={{width: 200, display: 'flex', alignItems: 'center'}}>
                        <Box sx={{ ml: 5, fontWeight: 'bold', marginLeft: 0, marginBottom: "1vh" }}>{movie.year}</Box>
                    </Box>
                    <Box sx={{width: 200, display: 'flex', alignItems: 'center', marginBottom: "1vh" }}>
                        <Rating
                            name="text-feedback"
                            value={parseFloat(movie.imDbRating)}
                            readOnly
                            precision={0.1}
                            size='large'
                        />
                        <Box sx={{ ml: 2, fontWeight: 'bold' }}>{'IMDB:\xa0' + movie.imDbRating}</Box>
                    </Box>
                    <Box sx={{ml: 0, fontWeight: 'bold', marginTop: '10vh'}} display='inline'>
                        {'Actors:\xa0'}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {movie.crew}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default React.memo(MovieCard);