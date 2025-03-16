import { app } from "./app.js";
import dotenv from 'dotenv';

dotenv.config()
const port = process.env.PORT;
app.listen(port, function(err){
    if(!err){
        console.log("server is listening at port: ",port);
    }

    else{
        console.log("error is => ",err);
    }
})