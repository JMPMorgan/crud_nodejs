import express from 'express';
import cors from 'cors';
import '../config.js';//Ir a Config
import { router } from '../routes/user.js';
import '../routes/auth.js';
import { dbConnect } from '../database/config.js';
export class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.USUARIOS_PATH='/api/user';
        this.AUTH_PATH='/api/auth';
        this.connectToDB();
        this.middlewares();
        this.routes();
    }

    async connectToDB(){
        await dbConnect();
    }

    middlewares(){
        //Public directory
        this.app.use(cors());

        //read and parse body
        this.app.use(express.json());
        //this is for the main folder in front 
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.USUARIOS_PATH,router);
        this.app.use(this.AUTH_PATH,router);
  
    }

    startServer(){
        this.app.listen(process.env.PORT,()=>{
            console.log(`Servidor Corriendo en:${this.port}`);
        });
    }
}