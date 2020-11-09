import "reflect-metadata";
import "dotenv";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { UserResolver } from './UserResolver';
import { createConnection } from "typeorm";


(async ()=> {
    const app = express();
    app.get("/", (_req, res) => res.send("hello") );

    // It knows all entity location by ORMCONFIG.json file
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, ()=>{
        console.log("Express Server Started");
    })
}) ();