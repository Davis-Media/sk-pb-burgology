/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnk4qgdmp43unh3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uoxqyghw",
    "name": "player",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5jhtqwuzg0nwvn0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hnk4qgdmp43unh3")

  // remove
  collection.schema.removeField("uoxqyghw")

  return dao.saveCollection(collection)
})
