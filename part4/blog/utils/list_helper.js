const dummy = (blogs) => {
   return 1
}

const totalLikes = (blogs) => {
   if (!Array.isArray(blogs) || blogs.length === 0){
      return 0
   }
   return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
   if (!Array.isArray(blogs) || blogs.length === 0){
      return null
   }
   const favorite = blogs.reduce((prev, current) => {
      return current.likes > prev.likes ? current : prev
   })
   return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
   }
}

module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog
  }