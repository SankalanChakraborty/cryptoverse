export const coinOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a2402449a1mshd1cd855fc7eac37p14e14cjsnd3f7cd98063f',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

export const coinHistoptions = {
	method: 'GET',
	headers: {
	  'X-RapidAPI-Key': 'a2402449a1mshd1cd855fc7eac37p14e14cjsnd3f7cd98063f',
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