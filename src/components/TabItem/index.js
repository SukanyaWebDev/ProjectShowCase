const TabItem = props => {
  const {eachItem} = props
  const {name, imageUrl} = eachItem
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}
export default TabItem
