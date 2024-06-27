/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1ct7yqplcl05lk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gacbk8dl",
    "name": "raidName",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "LW",
        "GOS",
        "DSC",
        "VOG",
        "VOTD",
        "KF",
        "RON",
        "CE",
        "SE"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1ct7yqplcl05lk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gacbk8dl",
    "name": "raidName",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Salvation's Edge",
        "Garden",
        "Last Wish",
        "King's Fall",
        "Crota's End",
        "Deep Stone Crypt",
        "Vow of the Disciple"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
