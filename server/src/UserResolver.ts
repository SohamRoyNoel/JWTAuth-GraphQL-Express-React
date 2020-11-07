import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { User } from './entity/User';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

@ObjectType()
class LoginResponse {
      @Field()
      accessToken: String
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

      @Mutation(() => LoginResponse)
      async login(
            @Arg('email') email:string,
            @Arg('password') password:string
      ) : Promise<LoginResponse> {
            const user = await User.findOne({ where: {email} });

            if(!user){
                  throw new Error('No User found');
            }

            const valid = await compare(password, user.password);
            
            if(!valid){
                  throw new Error('Password did not match');
            }
            
            // login Success
            return {
                  accessToken: sign({userId: user.id, }, "tokenSecretBoom", {
                        expiresIn: "15m"
                  })
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