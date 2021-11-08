import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (content) => {

  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const remove = (id) => {
  return async dispatch => {
    const deletedBlog = await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE',
      data: deletedBlog
    })
  }
}

export const like = (id, object) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, object)
    console.log('updatedBlog, axios', updatedBlog)
    dispatch({
      type: 'VOTE',
      data: updatedBlog
    })
  }
}

const reducer = (state = [], action) => {

  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'VOTE': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    console.log('BlogToChange', blogToChange)
    const changedBlog = {
      ...blogToChange, likes: blogToChange.likes += 1
    }
    console.log('changedBlog', changedBlog)
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }
  case 'DELETE': {
    const id = action.data.id
    return state.filter(blog =>
      blog.id !== id
    )
  }
  default:
    return state
  }

}

export default reducer
