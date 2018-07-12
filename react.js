class ArticleGrid extends React.Component{
    constructor(props){
        super(props);

        this.state = {articles: []}
    };

    componentDidMount(){
        var API_KEY = '1b023a304ea24b2493a9694af61d7d5d';
        var query = 'all';
        var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + query + '&api-key=' + API_KEY;

        $.getJSON(url, function(data, status){
           return this.setState({articles: this.parse(data)})
        }.bind(this))
    }


    parse(articles){
        articles = articles.response.docs;
        var article;
        console.log(articles);
        var parsedArticle = [];

        for(var i=0; i<articles.length; i++){
            article = articles[i];

            if (article.multimedia.find(this.checkXLarge)) {
                parsedArticle.push({
                    id: article._id,
                    title:    article.headline.main || 'Untitled',
                    imageURL: article.multimedia.find(this.checkXLarge).url || '#',
                    webURL:   article.web_url || '#',
                    by: article.byline.original,
                });
            }
        }
     return parsedArticle;
    };

    checkXLarge(image) {
        return image.subtype === 'xlarge';
    }

    render(){
        console.log(this.state.articles);
        return (
            <div>
                {this.state.articles.map(function(article){
                    return <Article data={article} id={article.id}/>
                })}
            </div>
        )
    }


}

class Article extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var imgURL = 'https://static01.nyt.com/' + this.props.data.imageURL;
        return(
            <div>
                <a title={this.props.data.title} href={this.props.data.webURL}>
                    <img src={imgURL}/>
                </a>
            </div>
        )
    }
}

ReactDOM.render(<ArticleGrid/>,document.getElementById('container'))



