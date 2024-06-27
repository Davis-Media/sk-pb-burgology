/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "c1ct7yqplcl05lk",
    "created": "2024-06-26 16:08:55.086Z",
    "updated": "2024-06-26 16:08:55.086Z",
    "name": "raids",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("c1ct7yqplcl05lk");

  return dao.deleteCollection(collection);
})
