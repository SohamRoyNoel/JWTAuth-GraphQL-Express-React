import "reflect-metadata";
import express from 'express';
import {ApolloServer} from 'apollo-server-express';


(async ()=> {
    const app = express();
    app.get("/", (_req, res) => res.send("hello") );

    const apolloServer = new ApolloServer({
        typeDefs:`
            type Query {
                hello: String!
            }
        `,

        resolvers: {
            Query: {
                hello: () => "hello world"
            }
        }
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, ()=>{
        console.log("Express Server Started");
    })
}) ();