import React from 'react'

const Newsitem = (props) => {
        let { title, description, imageUrl, newsUrl, author, date, source } = props
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={
                        {
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: '0'
                        }
                    }>
                        <span class="badge rounded-pill bg-danger" >{source}</span>
                    </div>
                    <img src={!imageUrl ? "https://www.hindustantimes.com/ht-img/img/2023/03/28/1600x900/Atiq_Ahmad_1679987249237_1679987249584_1679987249584.jpg"
                        : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}

                        </h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text '><small className='text-primary '> By {!author ? "unknown" : author} On {" "}
                            {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default Newsitem
