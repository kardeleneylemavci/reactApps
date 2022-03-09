import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Card, CardContent, TextField, CardMedia } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ServerFilesBasePath = "http://localhost:8000/";

export default function NewsUpdateDiolog({ open, handleClose, selectedNews, setNewTitle, setNewAuthor, setNewDescription, newsUpdate, selectMedia, setTempMedia, tempMedia, setTitle, setDescription, setAuthor }) {


  return (
    <div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle >
          <Card fullWidth>
            <CardContent>
              <TextField
                fullWidth
                id="outlined-basic"
                defaultValue={selectedNews.title}
                label="News Title"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
              />
            </CardContent>
          </Card>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Card fullWidth>
              <CardContent >

                <TextField
                  fullWidth
                  id="outlined-basic"
                  defaultValue={selectedNews.description}
                  label="News Description"
                  variant="outlined"
                  multiline
                  onChange={(e) => setDescription(e.target.value)}
                  rows={10}
                />
              </CardContent>
            </Card>
          </DialogContentText>
          <DialogContentText>
            <Card fullWidth>
              <CardContent >
                <TextField
                  fullWidth
                  id="outlined-basic"
                  defaultValue={selectedNews.author}
                  label="News Author"
                  variant="outlined"
                  onChange={(e) => setAuthor(e.target.value)}
                />

              </CardContent>
            </Card>
          </DialogContentText>
          <DialogContent>
            {
              selectedNews.media
                ?
                <Card fullWidth>
                  <CardMedia
                    component="img"
                    width="100%"
                    image={ServerFilesBasePath + selectedNews.media.path}
                    alt="green iguana"
                  />
                </Card>

                : null
            }
            <div>
              <img src={tempMedia} style={{ width: "300px" }} />

            </div>


          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            component="label"
            onClick={() => setTempMedia()}
          >
            Vazgeç
          </Button>
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


          <Button variant={"contained"} color={"primary"} onClick={() => newsUpdate(selectedNews._id)}>
            Kaydet
          </Button>
          <Button onClick={handleClose}>Disagree</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}