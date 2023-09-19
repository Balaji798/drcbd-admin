import React from 'react'
import {productRows} from '../../dummyData'

const ItemOrdered = () => {
  return (
    <div>
      {productRows.map((item,index)=>(
        <div key={index} style={{display:"flex",alignItems:"center"}}>
          <img src={item.img} style={{width:100,objectFit:"cover"}}/>
          <div >
            <h3>{item.name}</h3>
            <h4>Price:- {item.price}</h4>
            <h4>Quantity:- {item.stock}</h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ItemOrdered