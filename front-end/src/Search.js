import React, {useState, useEffect} from 'react';

const Search = () => {
  const [news, setNews] = React.useState([])
  const [searchNews, setSearchNews] = useState('react');
  const [url ,setUrl] = useState('https://hn.algolia.com/api/v1/search?query=react');
  const [loading, setLoading] = useState(false)
  
  const fetchNews = () => {
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    .then((data) => (
      setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error))
  }
 useEffect(() => {
  fetchNews()
 },[url])

 const submithandler = (e) => {
  e.preventDefault()
  setUrl(`https://hn.algolia.com/api/v1/search?query=${searchNews}`)
 }
  return (
   <div>
   <form onSubmit={submithandler}>
    <input type="text" value={searchNews} onChange={(e) => setSearchNews(e.target.value)}/>
    <button>search</button>
   </form>
   {loading ? <h1>loading</h1> : <>
    {news.map((item, id) => {
      return (
        <li key={id}>{item.title}</li>
      )
    })}</>}
   </div>
  )
}

export default Search;