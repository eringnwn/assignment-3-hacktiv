'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Photos", [
      {
        title: "A Photo",
        caption: "a caption",
        image_url: "https://picsum.photos/id/13/2500/1667",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Another Photo",
        caption: "another caption",
        image_url: "https://picsum.photos/id/14/2500/1667",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Photos", null, {});
  }
};
