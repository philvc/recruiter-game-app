import * as React from 'react';

// component
import { useLocation, Link } from '@reach/router';

// style
import './styles.css'

const NavBar = (props: any) => {

  const location = useLocation()
  const splitLocation = location.pathname.split('/').slice(1)
  console.log('splitLocation', splitLocation)
  let navigation = ''

  const navbar = splitLocation.map((navItem: any, index: number) => {
    navigation = navigation + '/' + navItem
    if (index === splitLocation.length - 1) {

      return <span key={navItem}>{navItem}</span>
    }

    return <Link
      className='nav-item'
      key={navItem}
      to={navigation}
    >
      {navItem.toLowerCase()}
      <span className="navigation-backlash-bar">
        /
          </span>
    </Link>
  })

  return (
    <div>
      {navbar}
    </div>
  )
}

export default NavBar;