import React from 'react'

const AddBlogForm = ({ add, handleTitle, handleAuthor, handleUrl, url, title, author }) => {
  return (
    <div>
      <h2>add a new blog</h2>
      <form onSubmit={add}>
        <div>
          title:{' '}
          <input
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div>
          author:{' '}
          <input
            value={author}
            onChange={handleAuthor}
          />
        </div>
        <div>
          url:{' '}
          <input
            value={url}
            onChange={handleUrl}
          />
        </div>
        <button style={{marginTop:10}} type="submit">add</button>
      </form>
    </div>
  )
}


export default AddBlogForm
