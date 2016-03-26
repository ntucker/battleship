
export default ({start: {x,y}, length, vertical}) => {
  let style={width: 50, height: 25, top: y*25, left: x*50}
  if (vertical) {
    style.height = style.height * length
  } else {
    style.width = style.width * length
  }
  return (
    <ship style={style}/>
  )
}