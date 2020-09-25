import React from 'react'
import config from '../config'

export default class EditBookmark extends React.Component {
  state = {
    title: '',
    url: '',
    description: '',
    rating: 1,
  }

  handleSubmit = e => {
    e.preventDefault()
    const { title, url, description, rating } = e.target

    const updatedBookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }

    // console.log(title, url, description, rating)

    fetch(config.API_ENDPOINT, {
      method: 'PATCH',
      body: JSON.stringify(updatedBookmark),
      headers: { 'content-type': 'application/json' },
    })
      .then(res => {
        if (!res) {
          return res.json().then(err => {
            throw err
          })
        }
        return res.json()
      })
      .then(data => {
        title.value = ''
        url.value = ''
        description.value = ''
        rating.value = ''
        this.props.onEditBookmark(data)
      })
  }

  render() {
    return (
      <div className="edit-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Edit title:</label>
          <input type="text" name="title" placeholder={'bookmark values'} />
          <br />
          <label htmlFor="url">Edit URL:</label>
          <input type="text" name="url" placeholder={'bookmark url value'} />
          <br />
          <label htmlFor="description">Edit description:</label>
          <input
            type="text"
            name="description"
            placeholder={'bookmark description values'}
          />
          <br />
          <label htmlFor="rating">Edit rating</label>]
          <input
            type="number"
            name="rating"
            id="rating"
            defaultValue="1"
            min="1"
            max="5"
            required
            placeholder={'bookmark description value'}
          />
          <br />
          <button type="submit">Submit</button>
          <button type="click" onClick={this.props.onEditBookmark}>
            Cancel
          </button>
        </form>
      </div>
    )
  }
}