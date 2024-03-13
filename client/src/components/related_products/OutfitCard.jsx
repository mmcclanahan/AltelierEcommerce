import React, {useState, useEffect} from 'react';
import StarDisplay from '../ratings/star_rating/Star_Display.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import PhotoView from './PhotoView.jsx'
const OutfitCard = ({obj, deleteOutfit, changeId}) => {

let salePrice = obj.sale_price;
let ogPrice = obj.default_price;
if (salePrice && salePrice.split('').slice(-2).join('') === '00') {
  salePrice = salePrice.split('').slice(0, -3).join('');
}
if (ogPrice && ogPrice.split('').slice(-2).join('') === '00') {
  ogPrice = ogPrice.split('').slice(0, -3).join('');
}
//{photo ? <img data-testid='mainImg' className='mainImg' onClick={()=>{changeId(obj.id)}}alt={`product image of ${obj.name}`} src={photo}/>:  <img data-testid='mainImg' className='mainImg' onClick={()=>{changeId(obj.id)}} alt={`product image of ${obj.name}`} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/256px-No-Image-Placeholder.svg.png"}/>}
  return (
    <div className='outfitCardDiv' data-testid='outfitCardDiv'>
      <div className='cardTop' data-testid='cardTop'>
        <FontAwesomeIcon className='BTN' data-testid='BTN' icon={faCircleXmark} onClick={()=> {deleteOutfit(obj.id)}}/>
        {obj.url ? <img onClick={()=>{changeId(obj.id)}}alt={`product image of ${obj.name}`} width='50px'src={obj.url} />: <img onClick={()=>{changeId(obj.id)}}/>}
      </div>
      <div data-testid='cardBottom' className="cardBottom"  onClick={()=>{changeId(obj.id)}}>
        <span className='cardCategory'>{obj.category}</span>
        <span className='cardName'>{obj.name}</span>
        {obj.sale_price ? <span data-testid='sale' style={{display:'flex'}}> <span className='prices' style={{ color:'red' }}>${salePrice}</span>
        <span className='prices' style={{ textDecoration: 'line-through' }}>${ogPrice}</span></span>: <span data-testid='noSale' className='prices'>${ogPrice}</span>}
        <span className='starSpan'><StarDisplay rating={obj.stars}/></span>
      </div>
  </div>
  )
}

export default OutfitCard;