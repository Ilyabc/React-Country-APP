const ListItems = ({items , searchCountry, onCountryClick, sorting}) => {

	return (	
		<ul className="search-area__list">
			{items.filter((val) => {                                {/* Search by text */}
				if(searchCountry == '') {
					return val
				} else if (val.name.toLowerCase().includes(searchCountry.toLowerCase())) {
					return val
				}}).sort((a, b) => {                                {/* Sort by DESC / ASC */}
					if (sorting) {
					  return b.name.localeCompare(a.name);
					}
					return a.name.localeCompare(b.name);
				}).map(item => {									{/* Displaying all items */}
					
				return(	
					<li onClick={() => onCountryClick(item)} key={item.name}>
						<p>{item.name}</p>
					</li>	
				)
			})}		
		</ul>
	);
};

export default ListItems;