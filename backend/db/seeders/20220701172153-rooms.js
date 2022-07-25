'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rooms', [
      {
        ownerId: 1,
        address: '880 Summit Blvd',
        city: 'Big Bear Lake',
        state: 'California',
        country: 'United States of America',
        lat: 34.236647,
        lng: -116.889336,
        name: 'Black Rock by Destination Big Bear',
        description: 'Completed in 2021, this modern, rustic, luxury masterpiece balances nature, architecture, design and functionality to create an unmatched mountain experience. The concept for Black Rock was inspired by taking a world-class luxury hotel experience and distilling it down into an epic vacation home. The owners have spared no expense in bringing that concept to life. Working with top designers, they brought a luxurious lifestyle to the mountains of Big Bear and created the ultimate Big Bear cabin rental.',
        price: 2337.00,
      },
      {
        ownerId: 2,
        address: '14th road Minh Phú',
        city: 'Sóc Sơn',
        state: 'Hà Nội',
        country: 'Vietnam',
        lat: 21.283391,
        lng: 105.777750,
        name: 'Big Pine House by the Forest',
        description: 'The Big Pine House is located right on the hillside with the surrounding old pine forest bringing a cool vibe all year round. The house also owns an extremely spacious front view with a transparent toughened glass wall.',
        price: 135.00,
      },
      {
        ownerId: 3,
        address: '27 Đ. Nguyễn Phan Chánh, Hoà Hải',
        city: 'Ngũ Hành Sơn',
        state: 'Đà Nẵng',
        country: 'Vietnam',
        lat: 15.991723,
        lng: 108.258543,
        name: 'Madame Phuong-Premium Ocean Front Apartment',
        description: 'Entire rental unit on the beachfront with a beautiful view of Da Nang beach right outside!',
        price: 51.00,
      },
      {
        ownerId: 7,
        address: '204 Big Sky Way',
        city: 'Joshua Tree',
        state: 'California',
        country: 'United States of America',
        lat: 38.050152,
        lng: -121.339526,
        name: 'The Kellogg Doolittle House',
        description: 'Created over 25 meticulous years, Kellogg Doolittle in Joshua Tree National Park is a marvel of the organic architecture movement. It is one of the most exclusive homes in the world, and available for the first time as an Airbnb Luxe exclusive.',
        price: 12500.00,
      },
      {
        ownerId: 1,
        address: '54432 Rd 432',
        city: 'Bass Lake',
        state: 'California',
        country: 'United States of America',
        lat: 37.336447,
        lng: -119.579650,
        name: 'Cozy A Frame in Bass Lake',
        description: 'Welcome to Acorn Falls! Ideally located, this cozy A frame is across the street from the Falls Beach at Bass Lake, walking distance to the Angel Falls trail head, and only 17 miles to Yosemite National Park. Acorn Falls is sure to delight all who enter. The cabin is a perfect choice for families, girlfriend/guys getaways, couples, or solo travelers looking for a bit of quiet solitude. Acorn Falls is comfortable, fully stocked with thoughtful amenities and luxurious finishes.',
        price: 536.00,
      },
      {
        ownerId: 1,
        address: 'Hagastubakken 26, 2005',
        city: 'Rælingen',
        state: 'Akershus',
        country: 'Norway',
        lat: 59.942727,
        lng: 11.051970,
        name: 'The WonderINN Mirrored Glass Cabin',
        description: 'Immerse yourself in the wilderness, still within reach of civilization! WonderINN is literally a hidden gem; the unique design of the mirrored glass blends into the landscape so you can retreat to comfort and luxury as you watch the world pass by.',
        price: 466.00,
      },
      {
        ownerId: 2,
        address: '198/8-9 Thawewong Rd, Pa Tong',
        city: 'Kathu',
        state: 'Phuket',
        country: 'Thailand',
        lat: 7.906378,
        lng: 98.296665,
        name: 'Villa Samira',
        description: 'A contemporary variation on classic Thai themes, this villa maxes out its panoramic views of the Bay of Bengal. A wide open great room is entirely alfresco, with a reflection pond in the center flanked by stepping stones and staircases above. Rest a cool drink on the ledge of your oversized jacuzzi or dip in the 19-meter infinity pool and take it all in. Quiet Kamala Beach is just a 4-mile drive.',
        price: 1490.00,
      },
      {
        ownerId: 7,
        address: 'Predio, Paraíso Escondido, Centro',
        city: 'Cabo San Lucas',
        state: 'Baja California Sur',
        country: 'Mexico',
        lat: 22.874361,
        lng: -109.937933,
        name: 'West Enclave 7 - Luxury Stay',
        description: 'Loungers wait on the white-sand beach beyond the warm sandstone walls of this contemporary home on the Sea of Cortez. Floor-to-ceiling windows open the living areas to water on two sides: the sea on one, and a courtyard reflecting pool on the other. Surrounded by Ritz Carlton resort grounds, it is close to golf and dining, plus art gallery walks in downtown San José del Cabo.',
        price: 5300.00,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Rooms', {
      address: { [Op.in]: ['3376 Lake Tahoe Blvd', '1 Boulevard de la Menara', '37 Lower Simcoe Street'] }
    }, {});
  }
};
