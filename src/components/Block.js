import classNames from 'classnames'

import './Block.scss'

export default ({hit, ...props}) => {
  return (
    <block className={classNames(hit, {clickable: !!props.onClick})} {...props}>
    
    </block>
  )
}