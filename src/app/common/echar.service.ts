import { Injectable } from '@angular/core';


declare var echarts: any;
@Injectable()
export class EcharService {

    getAxis(element) {
      
      let myChart = echarts.init(document.getElementById(element));
      let option = {
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line'
          }]
        };
        myChart.setOption(option, true);
    }

    getMonth(element){
        let myChart = echarts.init(document.getElementById(element));
        let option = {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['正常','迟到','旷课','请假']
            },
            grid: {
                left: '1%',
                right: '2%',
                bottom: '5%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1','2','3','4','5','6','7','8', '9', '10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'正常',
                    type:'line',
                    stack: '总量',
                    data:[0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0,0, 0]
                },
                {
                    name:'迟到',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'旷课',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'请假',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                }
            ]
        }
        myChart.setOption(option, true);
    }

}
