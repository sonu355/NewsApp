import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {

    constructor() {
        super();
        console.log("Hello");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=ab3227adbfe54ad699ce3c3224589dc6&page=1pageSize=20"
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ab3227adbfe54ad699ce3c3224589dc6&page=${this.state.page - 1}&pageSize=20`
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles ,
        page: this.state.page - 1
        })
    }

    handleNextClick = async () => {
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20) ){

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ab3227adbfe54ad699ce3c3224589dc6&page=${this.state.page + 1}&pageSize=20`
            let data = await fetch(url)
            let parsedData = await data.json()
            console.log(parsedData);
            this.setState({ articles: parsedData.articles ,
            page: this.state.page + 1
            })
        }
    }

    render() {
        return (
            <div className='container'>
                <h1>NewsMonkey - Top headlines</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 45) : ""}
                                description={element.description ? element.description.slice(0, 87) : ""}
                                imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button type="button" class="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
                </div>
            </div>

        )
    }
}

export default News
