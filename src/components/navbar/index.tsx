import * as React from 'react';

// component
import { useLocation, Link } from '@reach/router';

// style
import './style.css'

const NavBar = (props: any) => {
  console.log('props', props)
  const location = useLocation()
  const splitLocation = location.pathname.split('/').slice(1)
  console.log('location', location)
  console.log('location', splitLocation)
  const navbar = splitLocation.map((navItem: any, index: number) => {
    if (index === splitLocation.length - 1) {
      return <span key={navItem}>{navItem}</span>
    }
    return <Link className='nav-item' key={navItem} to=''>{navItem}/</Link>
  })
  return (
    <div>
      {navbar}
    </div>
  )
}

export default NavBar;