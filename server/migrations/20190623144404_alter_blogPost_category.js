exports.up = function(knex, Promise) {
  return knex.schema.table('BlogPost', blogPost => {
    blogPost.string('category', 255).alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('BlogPost', blogPost => {
    blogPost.dropColumn('category');
  });
};
