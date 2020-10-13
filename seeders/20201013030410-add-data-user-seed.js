"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        role: 1,
        fullName: "Admin",
        email: "admin@admin.com",
        password:
          "$2b$10$PWz27mhPn2AxBwdG6e4nsOSMLAouJbhXtLFv5DFimyMQRYbg0wnE6",
        gender: "Male",
        photoProfile: null,
        phone: "081335241314",
        address: "Jl Kepo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: 0,
        fullName: "Herly Chahya",
        email: "mbahcip00@gmail.com",
        password:
          "$2b$10$PWz27mhPn2AxBwdG6e4nsOSMLAouJbhXtLFv5DFimyMQRYbg0wnE6",
        gender: "Male",
        photoProfile: null,
        phone: "085156842765",
        address: "Jl Trunojoyo Utara no 6 Ngawi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
