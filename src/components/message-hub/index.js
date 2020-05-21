import * as React from 'react';

// modules
import { useTransition } from 'react-spring'

// styles
import { Container, Message, Button, Content, Life } from './styles.js'

let id = 0


const MessageHub = ({ config = { tension: 125, friction: 20, precision: 0.1 }, timeout = 1500, children }) => {

  // state
  const [refMap] = React.useState(() => new WeakMap())
  const [cancelMap] = React.useState(() => new WeakMap())
  const [items, setItems] = React.useState([])
  const transitions = useTransition(
    items,
    (item) => item.key,
    {
      from: { opacity: 0, height: 0, life: '100%' },
      enter: (item) => async (next) => {
        await next({ opacity: 1, height: 46 })
      },
      leave: (item) => async (next, cancel) => {
        cancelMap.set(item, cancel)
        await next({ life: '0%' })
        await next({ opacity: 0 })
        await next({ height: 0 })
      },
      onRest: (item) => setItems(state => state.filter(i => i.key !== item.key)),
      config: (item, state) => (state === 'leave' ? [{ duration: timeout }, config, config] : config),
    },
  )

  React.useEffect(() => void children(msg => setItems(state => [...state, { key: id++, msg }])), [])


  return (
    <Container>
      {transitions.map(({ key, item, props: { life, ...style } }) => (
        <Message key={key} style={style}>
          <Content ref={(ref) => ref && refMap.set(item, ref)}>
            {/* <Life style={{ right: life }} /> */}
            <p>{item.msg}</p>
            {/* <Button
              onClick={(e) => {
                e.stopPropagation()
                cancelMap.has(item) && cancelMap.get(item)()
              }}>
              X
            </Button> */}
          </Content>
        </Message>
      ))}
    </Container>
  )
};

export default MessageHub;