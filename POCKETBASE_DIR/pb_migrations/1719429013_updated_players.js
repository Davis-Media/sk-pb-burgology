/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jhtqwuzg0nwvn0")

  // remove
  collection.schema.removeField("yflztr3o")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5jhtqwuzg0nwvn0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yflztr3o",
    "name": "raid",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "c1ct7yqplcl05lk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
