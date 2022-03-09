import React, {useState} from "react";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ListItem } from "@mui/material";
const ServerFilesBasePath = "http://localhost:8000/";
function NewsList({ list, removeNewsByName, removeNewsById ,newsUpdate,setChanger,setNewTitle,setNewAuthor,setNewDescription,changer,newsItemSelected})
 {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Media</TableCell>
                            <TableCell>Haber Başlığı</TableCell>
                            <TableCell >İçerik</TableCell>
                            <TableCell >Yazar</TableCell>
                            <TableCell >Haber Trh.</TableCell>
                            <TableCell >İşlem</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            list && list.map((news, i) => (
                                <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {console.log(news.media)}
                                        {
                                            news.media
                                                ?
                                                <img src={ServerFilesBasePath + news.media.path} style={{ width: "100px" }} />
                                                : "yok"
                                        }
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {/*  <a href="/newsDetail"> {news.title} </a> */}
                                        <Link to={'/newsDetail/' + news._id}>{news.title}</Link>
                                    </TableCell>
                                    <TableCell >{news.description}</TableCell>
                                    <TableCell >{news.author}</TableCell>
                                    <TableCell >{news.createdAt}</TableCell>
                                    <TableCell >
                                        <Button variant="contained" color="primary" onClick={() => newsItemSelected(news)}> Güncelle</Button>
                                        <Button variant="contained" color="secondary" onClick={() => removeNewsByName(news.author)}> Yazara Göre Sil</Button>
                                        <Button variant="contained" color="secondary" onClick={() => removeNewsById(news._id)}> ID Göre Sil</Button>
                                        
                                        <Button variant="outlined" onClick={handleClickOpen}>
                                            HABERİ GÜNCELLE
                                        </Button>
                                        <Dialog open={open} onClose={handleClose}>
                                            <DialogTitle>HABER GÜNCELLE</DialogTitle>
                                            <div>{ changer 
                                            ?
                                            <DialogContent>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    defaultValue={news.title}
                                                    label="Title"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={(e) => setNewTitle(e.target.value)}
                                                />
                                                </DialogContent>
                                                :
                                                <div>{news.title}</div>
                                                }</div>
                                                <div> {changer 
                                                ?
                                                <DialogContent>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    defaultValue={news.author}
                                                    label="Author"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={(e) => setNewAuthor(e.target.value)}
                                                />
                                                </DialogContent>
                                                :
                                                <div>{news.author}</div>
                                                }</div>
                                                <div> {changer 
                                                ?
                                                <DialogContent>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    defaultValue={news.description}
                                                    label="Description"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={(e) => setNewDescription(e.target.value)}
                                                />
                                            </DialogContent>
                                            :
                                            <div>{news.description}</div>
                                                }</div>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                                { changer 
                                                ?
                                                <Button onClick={() => setChanger(true)}>Update</Button>
                                                :
                                                <Button onClick={() => newsUpdate()}>SAVE</Button>
                                            }
                                            </DialogActions>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    )
}
export default NewsList;