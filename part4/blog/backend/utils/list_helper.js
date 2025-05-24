var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((val, curr) => val + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.lenght === 0) {
    return null;
  }
  const justLikes = blogs.map((val) => val.likes);
  const maxLikes = Math.max(...justLikes);
  return blogs.find((blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const countedByAuthor = _.countBy(blogs, "author");
  const pairs = _.toPairs(countedByAuthor);
  const maxAuthor = _.maxBy(pairs, (pair) => pair[1]);

  return {
    author: maxAuthor[0],
    blogs: maxAuthor[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const countedByLikes = _.groupBy(blogs, "author");
  const mapped = _.map(countedByLikes, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, "likes"),
  }));
  const max = _.maxBy(mapped, "likes");

  return max;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
