// Imports
import React from 'react'
import { Segment } from 'semantic-ui-react'
import Markdown from './markdown'
import content from '../../README.md'

const Home = () => (
  <Segment style={{ overflow: 'auto' }}>
    <Markdown content={content} />
  </Segment>
)

export default Home
