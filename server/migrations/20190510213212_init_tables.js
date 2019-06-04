exports.up = (knex) => {
  return knex.schema
  .createTable('User', (user) => {
    user.increments('id').primary();
    user.string('first_name', 50).notNullable();
    user.string('last_name', 50).notNullable();
    user.string('email', 50).notNullable(); //unique
    user.string('password', 50).notNullable();
    user.enu('permission', ['admin', 'basic']).notNullable();
    user.timestamps(false, true);
  })
  .createTable('BlogPost', (blogPost) => {
    blogPost.increments('id').primary();
    blogPost.integer('user_id').unsigned().references('id').inTable('User').notNull().onDelete('cascade');
    blogPost.string('title').notNullable();
    blogPost.string('category', 50);
    blogPost.timestamps(false, true);
  })
  .createTable('BlogContent', (blogContent) => {
    blogContent.increments('id').primary();
    blogContent.integer('blogPost_id').unsigned().references('id').inTable('BlogPost').notNull().onDelete('cascade');
    blogContent.string('video_url');
    blogContent.text('video_text', 'longtext');
    blogContent.string('image_url');
    blogContent.text('image_text', 'longtext');
    blogContent.integer('sequence').notNullable();
    blogContent.timestamps(false, true);
  })
  .createTable('Comment', (comment) => {
    comment.increments('id').primary();
    comment.integer('blogPost_id').unsigned().references('id').inTable('BlogPost').notNull().onDelete('cascade');
    comment.integer('user_id').unsigned().references('id').inTable('User').notNull().onDelete('cascade');
    comment.integer('parent_id');
    comment.string('comment_text');
    comment.timestamps(false, true);
  });
};

exports.down = (knex) => {

  let removeForeignKeyChecks = () => {
    return knex.raw('SET foreign_key_checks = 0;');
  }

  let addForeignKeyChecks = () => {
    return knex.raw('SET foreign_key_checks = 1;');
  }

  let dropUserTable = () => {
    return knex.schema.dropTableIfExists('User');
  };

  let dropBlogPostTable = () => {
    return knex.schema.dropTableIfExists('BlogPost');
  };

  let dropBlogContentTable = () => {
    return knex.schema.dropTableIfExists('BlogContent');
  };

  let dropCommentTable = () => {
    return knex.schema.dropTableIfExists('Comment');
  };

  return removeForeignKeyChecks()
    .then(dropCommentTable)
    .then(dropBlogContentTable)
    .then(dropBlogPostTable)
    .then(dropUserTable)
    .then(addForeignKeyChecks);
};