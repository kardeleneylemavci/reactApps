import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsForm from '../components/news/NewsForm';
import NewsList from '../components/news/NewsList';
import NewsUpdateDiolog from "../components/news/NewsUpdateDiolog";
import { Container } from '@mui/material';
import FileTransfer from '../mylib/FileTransfer';
import { useParams } from "react-router-dom";
const ServerEndPoint = "http://localhost:8000/api/";
function News() {
    const [title, setTitle] = useState();   
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();
    const [media, setMedia] = useState();
    const [tempMedia, setTempMedia] = useState(null);
    const [list, setList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedNews, setselectedNews] = useState(null);
    const [newTitle, setNewTitle] = useState(null);
    const [newDescription, setNewDescription] = useState(null);
    const [newAuthor, setNewAuthor] = useState(null);
    const params = useParams(); // useParamsı yeni bir örneğini oluşturdum.
    console.log(params._id, 'propsa gelen parametre');
    const getId = params._id;
    useEffect(() => {
        allNews();
    }, []);

    const selectMedia = (e) => {
        let file = e.target.files[0];
        let baseType = file.type.split('/')[0];
        console.log(baseType, file);
        setTempMedia(URL.createObjectURL(file));
        console.log(URL.createObjectURL(file))
        setMedia(e.target.files[0]);
    }

    const newsSave = (uploadedMedia) => {
        let data = {
            title,
            author,
            description,
        }

        if (uploadedMedia) {
            data.media = uploadedMedia
        }
        console.log(data);
        axios.post(ServerEndPoint + 'news/save', data).then(res => {
            if (res) {
                allNews();
                alert("Tebrikler! Yeni Haber Kaydı Başarılı!");
            }
        }).catch(err => {
            console.log(err);
        });

    }


    const handleNewsSubmit = () => {
        if (media) {
            FileTransfer(media, (filePath) => {
                console.log(filePath, 'end')
                let fileData = {
                    path: filePath,
                    type: media.type,
                    status: true
                }

                newsSave(fileData);
            });
        } else {
            newsSave();
        }

    }

    const allNews = () => {

        axios.get(ServerEndPoint + 'news/list').then(res => {
            console.log(res.data);
            setList(res.data);
        }).catch(err => {
            console.log(err);
        });

    }

    const removeNewsByName = (author) => {
        //alert(_id);
        let status = true;
        axios.delete(ServerEndPoint + "news/removeByName/" + author + '/' + status).then(res => {
            console.log(res);

            if (res.statusText === "OK") {
                allNews();
                alert("veriler silindi");
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const removeNewsById = (_id) => {
        //alert(_id);
        let status = true;
        axios.delete(ServerEndPoint + "news/removeById/" + _id).then(res => {
            console.log(res);
            if (res.statusText === "OK") {
                allNews();
                alert("veriler silindi");
            }
        }).catch(err => {
            console.log(err);
        });
    }
    const newsItemSelected = (news) => {
        console.log("update", news);
        setOpen(true);
        setselectedNews(news);
    }
    const handleClose = () => {
        setOpen(false);
        allNews();
    }
    const newsUpdate = (getId) => {
        FileTransfer(media, (filePath) => {
            console.log(filePath, 'end')
            let fileData = {
                path: filePath,
                type: media.type,
                status: true
            }
            let data = {
                title: title,
                description: description,
                author: author,
            };
            if (fileData) {
                data.media = fileData
            }

            console.log(data);
            axios.put(ServerEndPoint + 'news/update/' + getId, data).then(res => {
                console.log(res);

            }).catch(err => {
                console.log(err)
            });
        });
    }
    

    return (
        <Container >
            <NewsForm
                setTitle={setTitle}
                setAuthor={setAuthor}
                setDescription={setDescription}
                handleNewsSubmit={handleNewsSubmit}
                selectMedia={selectMedia}
                tempMedia={tempMedia}
                setTempMedia={setTempMedia}
            />
            <NewsList
                list={list}
                removeNewsByName={removeNewsByName}
                removeNewsById={removeNewsById}
                setTitle={setTitle}
                setAuthor={setAuthor}
                setDescription={setDescription}
                newsItemSelected={newsItemSelected}
            />
            {
                selectedNews ?
                    <NewsUpdateDiolog
                        open={open}
                        handleClose={handleClose}
                        selectedNews={selectedNews}
                        newsUpdate={newsUpdate}
                        setNewTitle={setNewTitle}
                        setNewDescription={setNewDescription}
                        setNewAuthor={setNewAuthor}
                        selectMedia={selectMedia}
                        tempMedia={tempMedia}
                        setTempMedia={setTempMedia}
                        setTitle={setTitle}
                        setAuthor={setAuthor}
                        setDescription={setDescription}
                    />
                    : null
            }

        </Container>

    )
}
export default News;
