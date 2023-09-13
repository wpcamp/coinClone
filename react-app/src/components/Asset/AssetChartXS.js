import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetChartData } from '../../store/crypto';
import { useParams } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import coins from './coins';
import "./Asset.css"

export default function AssetChartXS({cryptoSymbol}) {
    const dispatch = useDispatch();
    const chartData = useSelector(state => state.crypto.chartData);


    const match = coins.find(coin => coin.symbol.toUpperCase() === cryptoSymbol.toUpperCase());
    const name = match ? match.name.toLowerCase() : null;


    const [startTime, setStartTime] = useState(Math.floor(Date.now() / 1000) - 86400);
    const [endTime, setEndTime] = useState(Math.floor(Date.now() / 1000));
    const [selectedInterval, setSelectedInterval] = useState('24h');
    const [isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {
        function calcStartTime(selectedInterval) {
            switch (selectedInterval) {
                case '1h':
                    setStartTime(endTime - 3600);
                    break;
                case '24h':
                    setStartTime(endTime - 86400);
                    break;
                case '7d':
                    setStartTime(endTime - 604800);
                    break;
                case '30d':
                    setStartTime(endTime - 2592000);
                    break;
                case '60d':
                    setStartTime(endTime - 5184000);
                    break;
                case '90d':
                    setStartTime(endTime - 7776000);
                    break;
                default:
                    break;
            }
        }
        calcStartTime(selectedInterval);
    }, [selectedInterval, endTime]);


    useEffect(() => {
        const fetchChartData = async () => {
            await dispatch(thunkGetChartData(name, startTime, endTime));
            setIsLoaded(true);
        };

        fetchChartData();
    }, [dispatch, name, selectedInterval, startTime, endTime]);



    const finalData = []
    for (let i = 0; i < chartData.length; i++) {
        const [time, value] = chartData[i];
        finalData.push({
            time: new Date(time).toLocaleString(),
            value,
        });
    }

    const min = Math.min(...finalData.map(dataPoint => dataPoint.value));
    const max = Math.max(...finalData.map(dataPoint => dataPoint.value));

    return (
        <>
            {isLoaded ? (
                <div>
                    <div id='intervalSelectDiv'>
                        <select
                            value={selectedInterval}
                            onChange={(e) => setSelectedInterval(e.target.value)}>
                            <option value="1h">1h</option>
                            <option value="24h">24h</option>
                            <option value="7d">7d</option>
                            <option value="30d">30d</option>
                            <option value="60d">60d</option>
                            <option value="90d">90d</option>
                        </select>
                    </div>
                    <ResponsiveContainer height={400} width={200}>
                        <LineChart data={finalData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                            <Line type="monotone" dataKey="value" stroke="#82ca9d" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>

                </div>
            ) : (
                <p>Loading Content...</p>
            )}
        </>
    );
}
