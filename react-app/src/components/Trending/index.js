import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetTrending } from "../../store/crypto";
import "./Trending.css"; // Import your CSS file for styling

export default function TrendingCard() {
    const trending = useSelector((state) => state.crypto.trending);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(thunkGetTrending());
        setIsLoaded(true);
    }, []);

    const trendingArr = Object.values(trending).flat();

    // Filter out items without "item" key
    const normalizedTrendingArr = trendingArr.filter((item) => item.item);

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextItem = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === normalizedTrendingArr.length - 1) {
                return 0; // Go back to the first item when reaching the end
            } else {
                return prevIndex + 1;
            }
        });
    };

    const prevItem = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                return normalizedTrendingArr.length - 1; // Go to the last item when reaching the beginning
            } else {
                return prevIndex - 1;
            }
        });
    };

    useEffect(() => {
        // Automatically switch to the next item every 5 seconds
        const intervalId = setInterval(nextItem, 5000);

        return () => {
            // Clear the interval when the component unmounts
            clearInterval(intervalId);
        };
    }, []);

    // Check if normalizedTrendingArr is empty before rendering
    if (normalizedTrendingArr.length === 0) {
        return null; // Or you can render a loading spinner or message here
    }

    const currentItem = normalizedTrendingArr[currentIndex]?.item;

    function formatPrice(value) {
        const base = 1;
        if (Math.abs(value) >= base) {
            return value?.toFixed(2);
        } else {
            return value?.toFixed(8).replace(/\.?0+$/, '');
        }
    }

    return (
        isLoaded && normalizedTrendingArr && currentItem && normalizedTrendingArr.every((coin) => coin !== undefined) ? (

            <div className="trending-card">
                <h1>Trending Coins (24hr)</h1>
                <h5><i className="fa-solid fa-circle-info"></i>  Please note that most trending coins are not yet supported on this platform until they have been vetted.</h5>
                <div className="carousel-container">
                    <button className="carousel-button" onClick={prevItem}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <div className="carousel-item">
                        <img src={currentItem?.small} alt="Thumbnail" />
                        <h2>{currentItem?.name}</h2>
                        <p>Symbol: {currentItem?.symbol}</p>
                        <p>Market Cap Rank: {currentItem?.market_cap_rank}</p>
                        <p>Price BTC: {formatPrice(currentItem?.price_btc)}</p>
                    </div>
                    <button className="carousel-button" onClick={nextItem}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        ) : (
            <>
                </>
        ))
}
