import React from 'react';
import { Grid, Box, FormControl, InputLabel, OutlinedInput, Button } from '@mui/material';
/* 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
 */

function NewsForm({ setTitle, setAuthor, setDescription, handleNewsSubmit, selectMedia, tempMedia,setTempMedia }) {

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ m: 1 }} onChange={(e) => setTitle(e.target.value)}>
                        <InputLabel htmlFor="outlined-adornment-amount">Title</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            label="Title"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ m: 1 }} onChange={(e) => setAuthor(e.target.value)}>
                        <InputLabel htmlFor="outlined-adornment-amount">Author</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            label="Author"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ m: 1 }} onChange={(e) => setDescription(e.target.value)}>
                        <InputLabel htmlFor="outlined-adornment-amount">Description</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            label="Description"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    
                    {
                        tempMedia 
                        ?
                            <div>
                                <img src={tempMedia} style={{width:"300px"}}/>
                                <Button 
                                variant="contained"
                                component="label"
                                onClick={() =>setTempMedia() }
                                >
                                    Vazgeç
                                </Button>
                            </div>
                            :
                             <Button
                            variant="contained"
                            component="label"
                        >
                            Select File
                            <input
                                type="file"
                                /* multiple */
                                accept={'image/*, video/*, audio/*'}
                                hidden
                                onChange={(e) => selectMedia(e)}
                            />
                        </Button>

                    }
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={() => handleNewsSubmit()} >
                        News Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )

}
export default NewsForm;