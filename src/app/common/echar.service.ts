import { Injectable } from '@angular/core';


declare var echarts: any;
@Injectable()
export class EcharService {

    getAxis(element) {
      
      const myChart = echarts.init(document.getElementById(element));
      const option = {
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

}
