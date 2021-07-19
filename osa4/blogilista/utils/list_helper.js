const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = []

  const reducer = (sum, item) => {
    return sum + item
  }

  blogs.forEach(value => {
    likes.push(value.likes)
  })

  return likes.length === 0
    ? 0
    : likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  var likes = 0
  var blog = {}

  blogs.forEach(value => {
    if (value.likes >= likes) {
      likes = value.likes
      blog = {
        title: value.title,
        author: value.author,
        likes: value.likes
      }
    }
  })

  return blog
}

const mostBlogs = (blogs) => {
  var blogCount = 0
  var blogsCount = []
  var blog = {}

  blogs.forEach(value => {
    var count = 0
    const author = value.author

    blogs.forEach(value => {
      if (value.author === author)
        count++
    })

    blogsCount.push({
      author: author,
      blogs: count
    })
  })

  blogsCount.forEach(value => {
    if (value.blogs >= blogCount) {
      blogCount = value.blogs
      blog = value
    }
  })

  return blog
}

const mostLikes = (blogs) => {
  var likeCount = 0
  var totalLikes = []
  var blog = {}

  blogs.forEach(value => {
    var count = 0
    const author = value.author

    blogs.forEach(value => {
      if (value.author === author)
        count += value.likes
    })

    totalLikes.push({
      author: author,
      likes: count
    })
  })

  totalLikes.forEach(value => {
    if (value.likes >= likeCount) {
      likeCount = value.likes
      blog = value
    }
  })

  return blog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
