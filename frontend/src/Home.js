import React from "react";
import { Link } from "react-router-dom";
import RedDiv from "./mylib/mydiv";

function Home (){
    return (
      <div>
        <RedDiv text="Hoşgeldiniz" style={{background:'rgb(181 114 114)',color:"white", padding:"15px 25px"}}/>
        <Link to={"/news/"}>Haber Yönetimi</Link><br/>
        <Link to={"/signup/"}>Kaydol</Link><br/>
        <Link to={"/signin/"}>Giriş Yap</Link>
      </div>
    )
};
export default Home;
