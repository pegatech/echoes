
exports.up = function(knex, Promise) {
  return Promise.all([
    //users
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('user');
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
    }),

    //artists
    knex.schema.createTable('artist', function(table) {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
    }),

    //many albums to one artist
    knex.schema.createTable('album', function(table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.integer('artist_id');
      table.string('genre').notNullable();
      table.integer('year').notNullable();
      table.string('art_url60').notNullable(); //saves album art 60px size square
      table.string('art_url100').notNullable(); //saves album art 100px size square
      table.foreign('artist_id').references('artist.id');
      table.unique(['title', 'artist_id']); //guarantees no repeated albums for an artist
    }),

    //many songs to one album
    knex.schema.createTable('song', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.integer('album_id');
      table.foreign('album_id').references('album.id');
      table.unique(['title', 'album_id']);
    }),

    //many users impressions to many albums
    knex.schema.createTable('album_impression', function(table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.integer('album_id');
      table.integer('rating');
      table.string('impression');
      table.foreign('user_id').references('users.id');
      table.foreign('album_id').references('album.id');
      table.unique(['user_id', 'album_id']);
    }),

    //many listening dates to one album impression
    knex.schema.createTable('listen_date', function(table) {
      table.increments('id').primary();
      table.integer('album_impression_id');
      table.date('date').notNullable();
      table.foreign('album_impression_id').references('album_impression.id');
      table.unique(['album_impression_id', 'date']);
    }),

    knex.schema.createTable('following', function(table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.integer('follower_id');
      table.foreign('user_id').references('users.id');
      table.foreign('follower_id').references('users.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('listen_date'),
    knex.schema.dropTable('album_impression'),
    knex.schema.dropTable('song'),
    knex.schema.dropTable('album'),
    knex.schema.dropTable('artist'),
    knex.schema.dropTable('following'),
    knex.schema.dropTable('users')
  ]);
};
