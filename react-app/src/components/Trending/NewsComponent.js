import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetNews } from '../../store/news';
import './NewsComponent.css';

const NewsComponent = () => {
    const newsData = useSelector(state => state.news.news.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetNews());
    }, []);

    // Check if newsData is defined and not an empty array before accessing it
    const newsItems = newsData && newsData.length > 0 ? newsData[0]?.screen_data.analysis : [];

    return (
        <div className="news-card">
            <div id='newsCardTitle'>Analysis:</div>
            <ul>
                {newsItems.map((newsItem, index) => (
                    <li key={index} className="news-item">
                        <div className="news-image">
                            <img src={newsItem.related_image} alt="news" />
                        </div>
                        <div className="news-content">
                            <a href={newsItem.article_href} className="news-title">
                                {newsItem.article_title}
                            </a>
                            {/* <p className="news-description">{newsItem.description}</p> */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsComponent;
