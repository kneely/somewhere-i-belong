// Imports
import React from 'react'
import PropTypes from 'prop-types'
import '../scss/gruvbox-dark.scss'
import '../scss/markdown.scss'

const wrapMarkup = (html) => ({ __html: html })

const Markdown = ({ content }) => (
  <div
    className="markdown"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={wrapMarkup(content)}
  />
)

Markdown.propTypes = {
  content: PropTypes.string.isRequired,
}

export default Markdown
