import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './entity/User';
import { hash } from 'bcryptjs';

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