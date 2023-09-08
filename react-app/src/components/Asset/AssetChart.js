import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetChartData } from '../../store/crypto';
import { useParams } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import coins from './coins';

export default function AssetChart() {
    const dispatch = useDispatch();
    const chartData = useSelector(state => state.crypto.chartData);


    const { cryptoSymbol } = useParams();

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

    // console.log("HERE IS THE COMPONENT DATA:", chartData);

    const finalData = []
    for (let i = 0; i < chartData.length; i++) {
        const [time, value] = chartData[i];
        finalData.push({
            time: new Date(time).toLocaleString(),
            value,
        });
    }
    // console.log("heres the initial data: ", new Date(chartData[0][0]));
    // console.log("heres regular chart data: ", chartData[0]);
    console.log('heres that final data: ', finalData[0]);

    const min = Math.min(...finalData.map(dataPoint => dataPoint.value));
    const max = Math.max(...finalData.map(dataPoint => dataPoint.value));

    return (
        <>
            {isLoaded ? (
                <div>
                    <div>
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
                    <LineChart width={1000} height={600} data={finalData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false}/>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="time" />
                        <YAxis domain={[min, max]} label={{ value: 'Price', angle: 0, position: 'insideLeft' }} tickFormatter={(value) => value.toFixed(2)}/>
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </div>
            ) : (
                <p>Loading Content...</p>
            )}
        </>
    );
}
