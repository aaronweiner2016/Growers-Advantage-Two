const { BlogPosts } = require('../models');

const blogPostData = [
    {
        title: "Indoor Grow!",
        author: "This is a residential grow light! It is designed for home use!",
        date: "This is a residential grow light! It is designed for home use!",
        post: "This is a residential grow light! It is designed for home use!",
        image: "/assets/images/images-growers/light.jpeg",
        blogCategory_id: 1,
    },

];

const seedBlogPosts = () => BlogPosts.bulkCreate(blogPostData);

module.exports = seedBlogPosts;
