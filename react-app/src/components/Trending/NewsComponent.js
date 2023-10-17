import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetNews } from '../../store/news';
import './NewsComponent.css';

const NewsComponent = () => {
    const newsData = useSelector(state => state.news.news.articles);
    const dispatch = useDispatch();
    console.log("newsData", newsData);

    useEffect(() => {
        dispatch(thunkGetNews());
    }, []);


    return (
        <div className="news-card">
            <div id='newsCardTitle'>News:</div>
            <ul>
                {newsData?.map((newsItem, index) => (
                    <li key={index} className="news-item">
                        <div className="news-image">
                            <img src={newsItem.urlToImage} alt="news" />
                        </div>
                        <div className="news-content">
                            <a href={newsItem.url} className="news-title">
                                {newsItem.title}
                            </a>
                            <p className="news-description">{newsItem.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsComponent;
