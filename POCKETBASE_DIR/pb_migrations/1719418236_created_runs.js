/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hnk4qgdmp43unh3",
    "created": "2024-06-26 16:10:36.546Z",
    "updated": "2024-06-26 16:10:36.546Z",
    "name": "runs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lpfp5e3g",
        "name": "encounter",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "yjcswvrm",
        "name": "wipe",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
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
  const collection = dao.findCollectionByNameOrId("hnk4qgdmp43unh3");

  return dao.deleteCollection(collection);
})
