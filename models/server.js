import express from 'express';
import cors from 'cors';
import '../config.js';//Ir a Config

/*
This works for multiples routes in multiples files
*/
import { router  as router_user} from '../routes/user.js';
import { router  as router_categories} from '../routes/categories.js';
import '../routes/auth.js';
import { dbConnect } from '../database/config.js';
export class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        /**
         * Also u can use a object with the paths
         * 
         * 
         * this.paths={
         *  USUARIOS:'/api/user',
         * etc...
         * }
         */
        this.USUARIOS_PATH='/api/user';
        this.AUTH_PATH='/api/auth';
        this.CATEGORIES_PATH='/api/categories';
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
        this.app.use(this.USUARIOS_PATH,router_user);
        this.app.use(this.AUTH_PATH,router_user);
        this.app.use(this.CATEGORIES_PATH,router_categories);
  
    }

    startServer(){
        this.app.listen(process.env.PORT,()=>{
            console.log(`Servidor Corriendo en:${this.port}`);
        });
    }
}