/*
Werry, Kristi
823386935
Assignment #7
*/

const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const product = require('./product.js');

const resolvers = {
    Query: {
      productList: product.productList,
      product: product.get,
      productCount: product.counts,
    },
    Mutation: {
      productAdd: product.productAdd,
      productUpdate: product.update,
      productDelete: product.delete,
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    formatError: (error) => {
      console.log(error);
      return error;
    },
});

function installHandler(app) {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    console.log('CORS setting:', enableCors);
    server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}
  
module.exports = { installHandler };