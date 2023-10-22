'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Photos", [
      {
        title: "Foto Pertama User 2",
        caption: "-",
        image_url: "https://picsum.photos/id/1/367/267",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Foto Kedua User 2",
        caption: "-",
        image_url: "https://picsum.photos/id/0/5000/3333",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Photos", null, {});
  }
};
