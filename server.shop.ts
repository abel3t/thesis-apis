import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './services/user/user.resolver';
import { ProductResolver } from './services/product/product.resolver';
import { PaymentResolver } from './services/payment/payment.resolver';
import { OrderResolver } from './services/order/order.resolver';
import { CouponResolver } from './services/coupon/coupon.resolver';
import { CategoryResolver } from './services/category/category.resolver';
import { VendorResolver } from './services/vendors/vendors.resolver';
const app: express.Application = express();
const path = '/shop/graphql';
const PORT = process.env.PORT || 4000;
const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ProductResolver,
      PaymentResolver,
      OrderResolver,
      CouponResolver,
      CategoryResolver,
      VendorResolver,
    ],
  });
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    tracing: true,
  });
  apolloServer.applyMiddleware({ app, path });

  app.listen(PORT, () => {
    console.log(`🚀 started http://localhost:${PORT}${path}`);
  });
};

main();
