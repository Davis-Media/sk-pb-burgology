/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mw3zh4lzoeuzhyw",
    "created": "2024-06-26 16:07:26.660Z",
    "updated": "2024-06-26 16:07:26.660Z",
    "name": "teams",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bqzwxocz",
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
      },
      {
        "system": false,
        "id": "6c1og9ob",
        "name": "users",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
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
  const collection = dao.findCollectionByNameOrId("mw3zh4lzoeuzhyw");

  return dao.deleteCollection(collection);
})
