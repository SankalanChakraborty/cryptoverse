export const coinOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

export const coinHistoptions = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
	  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
  };

export const fetchData = async(url, options)=>{
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

export const fetchHistData = async(url, options)=>{
	const response = await fetch(url, options);
    const data = await response.json();
    return data;
};