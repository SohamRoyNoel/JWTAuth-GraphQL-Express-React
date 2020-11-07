import { Field, ID, ObjectType } from "type-graphql";
import {Entity, ObjectIdColumn, ObjectID, Column, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;
}
