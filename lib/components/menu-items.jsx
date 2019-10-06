// Imports
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'

const MenuItemsRenderer = ({
  items = [], location: { pathname = '' } = {},
}) => (items.map(({
  text, icon, as, to,
}) => (
  <Menu.Item
    as={as}
    to={to}
    key={text}
    active={to === pathname}
  >
    <Icon name={icon} />
    {text}
  </Menu.Item>
)))

const MenuItems = withRouter(MenuItemsRenderer)

export default MenuItems
