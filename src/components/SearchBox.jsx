import React from 'react'
import { useNavigate } from 'react-router'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const SearchBox = ({items}) => {
    
      const navigate = useNavigate()
    
      const handleOnSearch = (string, results) => {
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
            navigate(`detail/${item.id}`)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }

      
  const formatResult = (item) => {
    return (
      <>
        <span className='cursor-pointer' style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
  )
}

export default SearchBox