import '../styles/FruitItem.css'

function FruitItem({ fruit }) {
  return (
    <div className="fruit-item">
      <div className="fruit-name">{fruit.name}</div>
      <div className="fruit-quantity">
        {fruit.quantity} {fruit.unit}
      </div>
    </div>
  )
}

export default FruitItem
