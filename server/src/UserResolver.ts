import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from './entity/User';
import { compare, hash } from 'bcryptjs';
import { Context } from './context';
import { createAccessToken, createRefreshToken } from './auth';
import { auth } from './middleware/auth';

@ObjectType()
class LoginResponse {
      @Field()
      accessToken: String
      @Field()
      userEmail: String
      @Field()
      userId: String
}

@Resolver()
export class UserResolver {
      @Query(() => String)
      hello(){
            return "hi!";
      }

      @Query(() => [User])
      users() {
            return User.find();
      }

      @Query(() => String)
      @UseMiddleware(auth)
      bye(
            @Ctx() { payload }: Context
      ){
            console.log(payload);
            return `User ID is : ${payload!.userId}`;
      }

      @Mutation(() => LoginResponse)
      async login(
            @Arg('email') email:string,
            @Arg('password') password:string,
            @Ctx() { res }:Context // set the CONTEXT for JWT refresh token that will be passed as COOKIE
      ) : Promise<LoginResponse> {
            const user = await User.findOne({ where: {email} });
            console.log(user);

            if(!user){
                  throw new Error('No User found');
            }

            const valid = await compare(password, user.password);
            
            if(!valid){
                  throw new Error('Password did not match');
            }
            
            // login Success
            res.cookie(
                  "jid",
                  createRefreshToken(user),
                  {
                        httpOnly:true
                  }                         
            )

            return {
                  accessToken: createAccessToken(user),                
                  userEmail: user.email,
                  userId: user.id.toString()
            }
                        
      }

      // Return type should be explicit
      @Mutation(() => Boolean)
      async register(
            @Arg('email') email:string,
            @Arg('password') password:string
      ) {
            const hashedPassword = await hash(password, 12);

            try {
                  await User.insert({
                        email: email,
                        password: hashedPassword
                  });                           
            } catch (error) {
                 console.log(error);
                  return false; 
            } 
            
            return true;
      }
}