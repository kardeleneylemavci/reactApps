import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // gönderdiğim news._id yi almak için ekledim
import { Button, Container, Card, CardContent, TextField, CardMedia } from '@mui/material';
import axios from "axios";
import NewsList from "../components/news/NewsList";
import NewsUpdateDiolog from "../components/news/NewsUpdateDiolog";
const ServerFilesBasePath = "http://localhost:8000/";
const ServerEndPoint = "http://localhost:8000/api/";
function NewsDetail() {
    const [news, setNews] = useState(null);
    const [changer, setChanger] = useState(false);
    const [newTitle, setNewTitle] = useState(null);
    const [newAuthor, setNewAuthor] = useState(null);
    const [newDescription, setNewDescription] = useState(null);


    const params = useParams(); // useParamsı yeni bir örneğini oluşturdum.
    console.log(params._id, 'propsa gelen parametre');
    const getId = params._id;

    useEffect(() => {
        getNewsItem();
    }, []);

    const getNewsItem = () => {
        axios.get(ServerEndPoint + 'news/detail/' + getId).then(res => {
            console.log(res.data);
            setNews(res.data);
        }).catch(err => {
            console.log(err);
        });

    }

    const newsUpdate = () => {

        let data = {
            title: newTitle,
            author: newAuthor,
            description: newDescription
        };

        console.log(data);
        axios.put(ServerEndPoint + 'news/update/' + getId, data).then(res => {
            console.log(res);
            setChanger(!changer);
            getNewsItem();
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <Container>
            {
                news
                    ?
                    <div>
                        {news.media
                            ?
                            <Card fullWidth>
                                <CardMedia
                                    component="img"
                                    width="100%"
                                    image={ServerFilesBasePath + news.media.path}
                                    alt="green iguana"
                                />
                            </Card>
                            : null}

                        {
                            changer
                                ?
                                <Card fullWidth>
                                    <CardContent>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            defaultValue={news.title}
                                            label="News Title"
                                            variant="outlined"
                                            onChange={(e) => setNewTitle(e.target.value)}
                                        />
                                    </CardContent>
                                </Card>
                                :
                                <h3>{news.title}</h3>
                        }


                        <div>
                            {
                                changer
                                    ?
                                    <Card fullWidth>
                                        <CardContent>

                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                defaultValue={news.description}
                                                label="News Description"
                                                variant="outlined"
                                                multiline
                                                onChange={(e) => setNewDescription(e.target.value)}
                                                rows={10}
                                            />

                                        </CardContent>
                                    </Card>
                                    :
                                    <div>{news.description}</div>
                            }


                        </div>
                        <div>

                            {
                                changer
                                    ?
                                    <Card fullWidth>
                                        <CardContent>
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                defaultValue={news.author}
                                                label="News Author"
                                                variant="outlined"
                                                onChange={(e) => setNewAuthor(e.target.value)}
                                            />

                                        </CardContent>
                                    </Card>
                                    :
                                    <div>
                                        <span>Yazar : </span>{news.author}
                                        <span> Oluşturulma Tarihi : </span> {news.createdAt}
                                    </div>
                            }


                        </div>
                        <Card fullWidth>
                            <CardContent>
                                {
                                    changer
                                        ?
                                        <Button variant={"contained"} color={"primary"} onClick={() => newsUpdate()}>
                                            Kaydet
                                        </Button>
                                        :
                                        <Button variant={"contained"} color={"primary"} onClick={() => setChanger(true)}>
                                            Güncelle
                                        </Button>
                                }

                            </CardContent>
                        </Card>
                    </div>
                    : "Haber bulunamadı"
            }
            <div>
                <NewsUpdateDiolog
                    setNewTitle={setNewTitle}
                    setNewAuthor={setNewAuthor}
                    setNewDescription={setNewDescription}
                    newsUpdate={newsUpdate}
                />
                <NewsList
                    news={news}
                    changer={changer}
                    newsUpdate={newsUpdate}
                    setChanger={setChanger}
                    setNewTitle={setNewTitle}
                    setNewAuthor={setNewAuthor}
                    setNewDescription={setNewDescription}
                />
            </div>
        </Container>

    )
}
export default NewsDetail;
