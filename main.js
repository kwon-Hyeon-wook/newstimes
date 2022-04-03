let menus = document.querySelectorAll('.menus button')
let Go = document.getElementById('Go')
let url
let news =[]
let page = 3
let total_pages =0


const getNews = async()=>{
    
    try{ 

    let header = new Headers({'x-api-key':'TUvKxZXZ0OI5laXWqnXhYjcFCC0TcNyncmadGDfMKIk'})
    let response = await fetch(url,{headers:header})
    let data = await response.json()
        console.log(data)
    if(response.status ==200){
        if(data.total_hits == 0){throw new Error('일치하는 것이 없습니다')}
        news = data.articles
        page = data.page
        total_pages = data.total_pages
        console.log(news)
        render()
        pageNation()
    }else{throw new Error(data.message)}
    }catch(error){console.log(error.message)
                  errorRender(error.message)}

} 

const errorRender = (message)=>{
let errorHTML = `<div class= "text-center alert alert-primary" role="alert">
${message}
</div>`
document.getElementById('news-board').innerHTML = errorHTML
}

const pageNation = ()=>{
let pageGroup = Math.ceil(page/5)
let last = ''
if(pageGroup*5>total_pages){last = total_pages}
else{last =pageGroup*5}
let first = last-4<1?1:last-4

let pageNationHTML ='' 

if(page>1){pageNationHTML+= `<li class= "page-item">
<a class="page-link" href="#" aria-label="Previous" onclick ="moveToPage(1)">
  <span aria-hidden="true">&lt;&lt;</span>
</a>
</li>
<li class="page-item">
<a class="page-link" href="#" aria-label="Previous" onclick ="moveToPage(${page-1})">
  <span aria-hidden="true">&lt;</span>
</a>
</li>
`}

for(let i=first;i<=last;i++){
if(i<=total_pages){
pageNationHTML+=
`<li class="page-item ${page==i?"active":""}"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`
}
}

if(page<total_pages){
pageNationHTML+= `<li class="page-item">
<a class="page-link" href="#" aria-label="Next" onclick ="moveToPage(${page+1})">
  <span aria-hidden="true">&gt;</span>
</a>
</li>
<li class="page-item">
<a class="page-link" href="#" aria-label="Next" onclick ="moveToPage(${total_pages})">
  <span aria-hidden="true">&gt;&gt;</span>
</a>
</li>
`}

document.querySelector('.pagination').innerHTML = pageNationHTML
}

const moveToPage = (num)=>{
page = num
console.log(num)
url.searchParams.set('page',page)
getNews()
}

const SearchNews = async ()=>{
    let textContent = document.getElementById('text-content')
     url = new URL(`https://api.newscatcherapi.com/v2/search?q=${textContent.value}&countries=US&page_size=10`) 
    getNews()
}

const getLatestNews = async ()=>{
 url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=10`) 
getNews()
}




const openNav = ()=>{
document.getElementById('mySideNav').style.width = '250px'
}

const closeNav = ()=>{
document.getElementById('mySideNav').style.width= '0px'
}

menus.forEach(item=>item.addEventListener('click',(e)=>{getNewsByTopic(e)}))

const getNewsByTopic = async (e)=>{
let topic = e.target.textContent.toLowerCase()
 url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
getNews()
} 





const render = ()=>{
let newsHTML = ''
newsHTML = news.map(news=>{
return `<div class="row news">

<div class="col-lg-4">
    <img class="news-img-size" src="${news.media}">
</div>
<div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.summary}</p>
    <div>${news.rights}*${news.published_date}</div>
</div>

</div>`
}).join('')
document.getElementById('news-board').innerHTML = newsHTML
}

getLatestNews()
Go.addEventListener('click',SearchNews)