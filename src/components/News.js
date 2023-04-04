import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


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
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        console.log("Hello");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }

    async updateNews() {
        console.log(this.props.apiKey);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url)
        console.log(data);
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
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }

    handleNextClick = async () => {
        console.log("Next");
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    render() {
        return (
            <>
                <h1 className="text-center m-3">***NewsMonkey - Top headlines*** on {this.capitalizeFirstLetter(this.props.category)}</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title ? element.title.slice(0, 45) : ""}
                                        description={element.description ? element.description.slice(0, 87) : ""}
                                        imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
                </div> */}
            </>

        )
    }
}

export default News
