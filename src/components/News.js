import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import propTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'science'
    }
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string
    }

    constructor(props) {
        super(props);
        console.log("Hello");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `${this.props.category} - NewsMonkey`
    }

    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e0781f04ab746eb9560fbc5a2169871&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ 
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews()
    }

    handlePrevClick = async () => {
        console.log("previous");
            this.setState({page: this.state.page - 1})
            this.updateNews()
    }

    handleNextClick = async () => {
        console.log("Next");
        this.setState({page: this.state.page + 1})
        this.updateNews()
    }

    render() {
        return (
            <div className='container'>
                <h1 className="text-center m-3">***NewsMonkey - Top headlines***</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 45) : ""}
                                description={element.description ? element.description.slice(0, 87) : ""}
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
                </div>
            </div>

        )
    }
}

export default News
