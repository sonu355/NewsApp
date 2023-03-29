import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
  render() {
    return (
      <div>
        <h3>this is news</h3>
        <Newsitem/>
      </div>
    )
  }
}

export default News
