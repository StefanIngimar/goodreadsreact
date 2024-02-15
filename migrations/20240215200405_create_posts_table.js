exports.up = function(knex) {
  return knex.schema.hasTable('posts').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('posts', table => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('title', 100).notNullable();
        table.text('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};
