exports.up = function(knex) {
  return knex.schema.hasTable('user_books').then(exists => {
    if (!exists) {
      return knex.schema.createTable('user_books', table => {
        table.integer('user_id').notNull().references('id').inTable('users');
        table.string('book_id', 255).notNull();
        table.string('status', 255).checkIn(['read', 'want to read', 'currently reading', 'currentlyReading']);
        table.primary(['user_id', 'book_id']);
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_books');
};
