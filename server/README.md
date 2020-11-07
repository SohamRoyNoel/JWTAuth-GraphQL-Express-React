# Learning Authentication  with GraphQL-Express-React

#### install mongodb withtypeorm
```typeorm init --name server --database mongodb```

#### move to server folder
```cd server```

#### create tsconfig.js
```npx tsconfig.json```

#### create a package.lock.json
```yarn```

#### update all dependencies in package.json
```yarn upgrade-interactive --latest```

#### reflect-metadata install
```npm install reflect-metadata --save```

#### install express apollo-server-express graphql
```yarn add express apollo-server-express graphql```

#### install graphql and express type as DEV dependency
```yarn add -D @types/express @types/graphql``` 

#### add type-graphql to avoid GQL query mess
```yarn add type-graphql```

#### password Hashing 
```yarn add bcryptjs```

#### add TS dependencies for bcrypt as DEV dependencies
```yarn add -D @types/bcryptjs```

#### add nodemon as DEV dependency
```yarn add -D nodemon```

#### see the change in package.json
```"start": "nodemon --exec ts-node src/index.ts"```


#### Note:
      -in order to expose field in GQL query user @Field() annotation along with @ObjectType() on the ENTITY model
