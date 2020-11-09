import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { Context } from '../context';

// use small context for the type ResolverData<Context>
export const auth : MiddlewareFn<Context> = ({ context }, next)  => {

      // Collect token from header
      const authorization = context.req.headers['authorization'];

      // Check if token exists
      if(!authorization){
            throw new Error('No Token Found');
      }

      // check if token is good
      try {
            const token = authorization.split(" ")[1];
            // As we took ID as token payload, lets get the payload first
            const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

            // Assign the id to context
            context.payload= payload as any;
            
      } catch (error) {
            console.log(error);
            throw new Error("Not Authenticated");
      }

      return next();
}