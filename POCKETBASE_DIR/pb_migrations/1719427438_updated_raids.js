/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1ct7yqplcl05lk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "znlwqeun",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1ct7yqplcl05lk")

  // remove
  collection.schema.removeField("znlwqeun")

  return dao.saveCollection(collection)
})
