import { SignalWifi1BarLockSharp } from '@material-ui/icons';
import Axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import moment from 'moment'
function ChartMoney ({shop_id}) {
    const [chartData, setChartData] = useState({})
    
    const chart = () => {
        let Month = moment().month()+1;
        let month;
        let year = moment().year();
        let shopMoney = [0, 0, 0, 0, 0, 0];
        let Year;
        let monthlabel =[0,0,0,0,0,0];

        for (let i = 5; i >=0; i--) {
            if (Month-i<=0) {
                month = Month-i+12;
                Year = year-1;
            }
            else {
                month = Month -i;
                Year = year;
            }
            monthlabel[5-i]= month; 
            Axios.get(`http://localhost:8000/shop/${shop_id}/totalMoney/${Year}/${month}`)
                .then(res => {
                    console.log(res);
                    for (const dataObj of res.data) {
                        if( dataObj.total != null )
                        {
                            shopMoney[5-i] = (parseInt(dataObj.total))    
                        }   
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        }
        console.log(shopMoney);
        setChartData({
            labels: monthlabel,
            datasets: [
                {
                    label: 'Total Money',
                    data: shopMoney,
                    backgroundColor: [
                        'rgb(255,255,0)',
                        'rgb(54,162,235)',
                        'rgb(255,206,86)',
                        'rgb(75,102,255)',
                        'rgb(153,159,64)',
                        'rgb(255,184,64)',
                    ]
                }
            ]
        })
    }
    useEffect(() => {
        chart()
    }, [])

    return (
        <div className='chart'>
            <Bar data={chartData}></Bar>
        </div>
    )
}
export default ChartMoney;