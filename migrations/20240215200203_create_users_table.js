exports.up = function(knex) {
  return knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username', 255).notNullable().unique();
        table.string('email', 255).notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('password', 255).notNullable();
        table.string('profile_picture_url', 255);
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
