const fetchData = async (url: string) => {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(url, options);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        const result = await response.json();
        return result;
    } catch (err: any) {
        console.error(err);
        return [];
    }
};
  
export default fetchData;
