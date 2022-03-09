import axios from "axios";
import RandomString from "./RandomString";
const ServerEndPoint = "http://localhost:8000/api/";
const FileTransfer = (file, callback) => {
    let fileReader = new FileReader(),
        method, encoding = 'binary', type = 'binary';
   
    let name = file.name;
    let fileExt = file.name.split('.').pop();
    const renamedFile = new File([name], RandomString(32, '#aA') + '.' + fileExt);
    //console.log(renamedFile,"rename ");
    
    switch (type) {
        case 'text':
            method = 'readAsText';
            encoding = 'utf8';
            break;
        case 'binary':
            method = 'readAsBinaryString';
            encoding = 'binary';
            break;
        default:
            method = 'readAsBinaryString';
            encoding = 'binary';
            break;
    }

    let fileType=file.type.split('/')[0];
    console.log(fileType);
    let path;
    switch (fileType) {
        //docx
        case 'application'://word excell pdf tipi
            path = "documents";
            break;
        case 'image':
            path = "images";
            break;
        case 'video':
            path = 'videos';
            break;
        case 'text':
            path = "documents";
            break;
        default:
            path = "images";
            break;
    }

    const fileName = renamedFile.name;
    fileReader[method](file);
    fileReader.onload = function (file) {
        let outFile = fileReader.result;
        let data = {
            outFile,
            fileName,
            path,
            encoding
        }
        //console.log(" dosyamız =>>>",outFile);
        axios.post(ServerEndPoint + 'news/upload', data).then(res => {
            console.log(res, " file send red, file transfer");
            if(res){
                const url = 'uploads/' + path + '/' + fileName; 
                callback(url)
            }
            
        }).catch(err => {
            console.log(err)
        })
    }
    
}

export default FileTransfer;