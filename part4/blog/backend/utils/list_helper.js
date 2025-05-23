const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((val, curr) => val + curr.likes, 0);
};
module.exports = {
  dummy,
  totalLikes,
};
