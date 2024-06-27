/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1ct7yqplcl05lk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rr0wazyt",
    "name": "players",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5jhtqwuzg0nwvn0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h1wxgnfc",
    "name": "runs",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "hnk4qgdmp43unh3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1ct7yqplcl05lk")

  // remove
  collection.schema.removeField("rr0wazyt")

  // remove
  collection.schema.removeField("h1wxgnfc")

  return dao.saveCollection(collection)
})
