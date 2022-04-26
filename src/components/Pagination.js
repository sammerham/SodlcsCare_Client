import React from 'react'

const Pagination = ({ totalItems, itemsPerPage, paginate }) => {
  const pageNums = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++){
    pageNums.push(i);
  }


  return (
    <ul className='pagination justify-content-center mt-4'>
      {pageNums.map(num => (
        <li className='page-link' key={num} onClick={()=>paginate(num)}>
          {num}
        </li>
      ))}
    </ul>
  )
}

export default Pagination