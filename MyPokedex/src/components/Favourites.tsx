import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFromAPI, pokemon } from '../api/fetchFromAPI';
import { removeFromFavourites } from '../api/removeFromFavourites';
import List from '@mui/material/List';
import  ListItem  from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'
import  CardActionArea from '@mui/material/CardActionArea';
import  CardMedia  from '@mui/material/CardMedia';
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'


const Favourites = () => {
    
    const [FavPokemon, setFavePokemon ] = React.useState<pokemon[] | null>([]);

    useEffect(()=> {
        fetchFromAPI(setFavePokemon);
    },[])
 
    
    return (

        <>
        
            <List>
               {FavPokemon && FavPokemon.length === 0 && (
                <ListItem sx = {{justifyContent: 'center'}}>
                    <Box textAlign='left' sx={{backgroundColor: 'white', borderStyle: 'solid', borderColor: 'black',p: 2, borderRadius: 10}}>
                        <Box sx={{height: '50%', backgroundColor: 'red'}}></Box>
                        <Typography p ={{pr: 1}} style={{color: "black"}}>No Pokémon Added</Typography>
                    </Box>
                </ListItem>
               )} 
               {FavPokemon && FavPokemon.map((info)=> (
                <ListItem>
                    <Card className='card' sx = {{width: '50',m : 'auto', borderRadius: '8%'}}>
                        <CardActionArea sx = {{flexgrow: 1, justifyContent: 'center'}}>
                            <Grid container spacing={2}>
                                <CardMedia
                                    component="img"
                                    sx ={{width: '50%', m: 'auto'}}
                                    image={Object.values(info)[2] as string}
                                    alt={Object.values(info)[1] as string}
                                />
                                <Box textAlign='center' sx ={{mt: 1, width: '100%'}}>
                                    <Typography className="card-text" variant='body1' component="div">
                                        PokéID: {Object.values(info)[0]}
                                    </Typography>
                                    <Typography className="card-text" variant='body1' component="div">
                                            {(Object.values(info)[1] as string).toUpperCase()}    
                                    </Typography>
                                    
                                    <Button variant="text" onClick={()=>removeFromFavourites(Object.values(info)[0] as number, setFavePokemon)}>Remove</Button>
                                </Box>
                            </Grid>
                        </CardActionArea>
                    </Card>
                </ListItem>
               ))}
            </List>
         
            <Button className="Routing-button" type='button' sx ={{backgroundColor: 'black'}}>
                <Link style = {{height: 24}} to="/"><KeyboardBackspaceIcon style = {{color: "white"}} /></Link>
            </Button>

        </>
    )


}

export default Favourites