const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  var total = 0
  blogs.forEach((item) => {
    total += item.likes
  })
  return total

}

const favoriteBlog = (blogs) => {
  var mostLikedBlogIndex = 0
  blogs.forEach((item, i) => {
    if (blogs[mostLikedBlogIndex].likes < blogs[i].likes) {
      mostLikedBlogIndex = i
    }
  })
  return blogs[mostLikedBlogIndex]

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
