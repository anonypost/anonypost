require('babel-polyfill')
var MongoClient = require('mongodb').MongoClient

Yavanna.provide('DB', () => {
  return {
    exec: async function (collection, operation, query, projection) {
      try{
        let conn = await getConnection()
        if (projection === undefined){
          console.log("projection undefined")
          projection = {}
        }
        return await conn.collection(collection)[operation](query, projection).toArray();
      }catch(error){
        console.log(error)
        return error
      }
    },

    execOne: async function (collection, operation, query) {
        let conn = await getConnection()
        let result = await conn.collection(collection)[operation](query);
        console.log("successfully executed once!")
        return result
    },

    updateOne: async function (collection, args, set) {
        var operation = 'updateOne'
        let conn = await getConnection()
        console.log(args)
        let result = await conn.collection(collection)[operation](args, set);
        console.log("successfully updated!")
        return result
    },

    findAndModify: async function (collection, query, sort, update, options) {
      var operation = 'findAndModify'
      let conn = await getConnection()
      let result = await conn.collection(collection)[operation](query, sort, update, options);
      console.log("successfully found and Modified!")

      return result

    }
  }


  var existingConnection
  async function getConnection () {
    if (existingConnection) return existingConnection
    existingConnection = await MongoClient.connect('mongodb://localhost:27017/anonypost')
    return existingConnection
  }
})
