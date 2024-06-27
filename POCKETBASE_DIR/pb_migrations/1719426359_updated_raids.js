/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1ct7yqplcl05lk")

  // remove
  collection.schema.removeField("qa9lhwig")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1ct7yqplcl05lk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qa9lhwig",
    "name": "team",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "mw3zh4lzoeuzhyw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
