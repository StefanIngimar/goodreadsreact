exports.up = function(knex) {
  return knex.schema.hasTable('posts').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('posts', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('title', 100).notNullable();
        table.text('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('userProfilePictureUrl').after('user_id');
        table.string('bookImageUrl').after('content');
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
