// Highcharts 全局设置 语言
Highcharts.setOptions({
    global: {
        useUTC: false
    },
    lang: {
        contextButtonTitle: '图表导出菜单',
        downloadJPEG: '导出JPG格式图片',
        downloadPDF: '导出PDF格式文档',
        downloadPNG: '导出PNG格式图片',
        downloadSVG: '导出SVG矢量图',
        printChart: '打印图表',
        rangeSelectorZoom: ' ',
        resetZoom: '重置缩放',
        loading: '加载中',
        rangeSelectorFrom: '从',
        rangeSelectorTo: '至',
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        weekdays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
    }
});

function setChart(id, objDt) {
    //设置网页大小
    var startData = startLine();
    console.log(startData);
    var chartbox = $("#" + id);
    chartbox.css("width", objDt.width);
    chartbox.css("height", objDt.height);

    //    Array.prototype.max = function() { // 最大值
    //        return Math.max.apply({}, this)
    //    };
    //    Array.prototype.min = function() { // 最小值
    //        return Math.min.apply({}, this)
    //    };
    //    var rmax = objDt.data.max();
    //    var rmin = objDt.data.min();

    var Hz = 1000 / objDt.fs; // objDt.fs
    var startdt = objDt.measureTime;
    var startTime = "";	
    var endTime = "";
    var pageDt = 6 * (objDt.page - 1) * 1000;
    var maxValue = 2000;
    var minValue = -2000;

    startdt += pageDt;
    console.log(startdt);
    switch (objDt.type) {
        case "ab_ecg":
            Hz = 6000 / objDt.data.length; //频率
            minValue = -1000;
            maxValue = 1000;
            break;
        case "ecg":
            minValue = -1000;
            maxValue = 1000;

            break;
        case "mi_ecg":
            minValue = -127;
            maxValue = 128;

            break;
        case "ab_ecg1":
            minValue = 0;
            maxValue = 255;

            break;
        case "ab_ecg2":
            minValue = -127;
            maxValue = 128;

            break;
        case "ppg":
            minValue = 0;
            maxValue = 128;

            break;
        case "hr_ecg":
            startTime = objDt.startTime;
            endTime = objDt.endTime;
            minValue = 0;
            maxValue = 150;

            break;
        case "hr_ppg":
            minValue = 30;
            maxValue = 200;
            startTime = objDt.startTime;
            endTime = objDt.endTime;
            break;
    }

    //  console.log(maxValue);
    //  console.log(minValue);
    var cellHeight = (maxValue - minValue) / objDt.height * 10;
    //  console.log(objDt);
    //  maxValue = (rmax < maxValue) ? rmax : maxValue;
    //  minValue = (rmin > minValue) ? rmin : minValue;
    //  console.log(rmax);
    //  console.log(rmin);
    //心电 ecgChart
    if (chartbox.length > 0 && id == "ecgChart") {
        // 创建highcharts
        window.chart = new Highcharts.StockChart({
            //            loading: {
            //                hideDuration: 1000,
            //                showDuration: 1000
            //            },
            chart: {
            	// plotBorderWidth: 1,
            	// plotBorderColor: 'red',
                //          reflow: false,//图会根据当窗口或者框架改变大小时而改变
                selectionMarkerFill: 'red', //当选中某一区域时图会被放大，此时选中区域会有背景颜色
                height: objDt.height,
                width: objDt.width,
                // animation: true,//是否开启动画
                renderTo: id, // 对应的div id
                // backgroundColor: '#EEEEEE', //设置背景颜色 （可以设置渐变）
                // borderColor: '#ddd', //图表外边框的颜色
                // borderRadius: 30, //图表外边框圆角
                //          borderWidth : '1', // 图表外边框的宽度
                panning: false, //禁用放大
                // pinchType: 'x', //禁用手势操作
                // zoomType: "x",
                panKey: 'shift',
                showAxes: true, //当一个空图动态的添加数据集时是否要显示轴，默认为false，不显示
                // 一些事件 比如addSeries, click, load,redraw, selection
                //                events: {
                //                    load: function() {
                //                        this.showLoading();
                //                    }
                //                }

            },
            // 选中缩放的地方
            rangeSelector: {
                inputEnabled: true,
                buttons: [
                  {
                  type : 'second',
                  count : 3,
                  text : '3秒'
                  }
                 , {
                     type : 'all',
                     text : '全部'
                 } 
                ],
                buttonTheme: {
                    width: 50
                },
                inputDateFormat: '%Y-%m-%d %H:%M:%S:%L',
                inputBoxWidth: 160,
                //                inputEditDateFormat: '%Y-%m-%d %H:%M:%S:%L',
                selected: 0,
                // 格式化form 和TO
                // inputDateParser : function(value) {
                // value = value.split(/[:\.]/);
                // console.log(value);
                // return Date.UTC(2015, 05, 28, 11 + parseInt(value[0], 10),
                // 23 + parseInt(value[1], 10),
                // 05 + parseInt(value[2], 10), parseInt(value[3], 10));
                // }
            },
            // 图表缩放导航
            navigator: {
                enabled: false,
            },
            exporting: {
                enabled: false
            },
            title: {
                text: null
                // useHTML:true,
    			// text:"Highcharts中文网 | <a href='http://www.hcharts.cn' target='_blank'>中文教程</a>" 
            },
            yAxis: {
                min: minValue,
                max: maxValue,
                tickInterval: cellHeight * 5, // 每大格0.5 毫伏 500
                gridLineWidth: 1,
                gridLineColor: '#ff6a6a', // #ed7b10
                minorGridLineWidth: 0.5, // 次级网格线的宽度 0.5
                minorGridLineColor: '#eda8b7', // 次级网格线的颜色 b0a091
                minorTickInterval: cellHeight, // 次级网格的间隔 0.1毫伏 100
                labels: {
                    enabled: false
                        // 是否显示y轴
                }
            },
            tooltip: {
                enabled: false,
                crosshairs: false //跟随光标的精准线
                    // valueDecimals: 2
            },
            xAxis: {

                type: 'datetime',
                //          minRange : 3000, // 最小放大比例 1S
                //                min: startdt,
                tickPixelInterval: 500, // 网格间隔宽度默认100
                tickLength: 0, // 刻度线的长度
                tickInterval: 200, // 每大格0.2S
                gridLineWidth: 1, // 网格线的宽度
                gridLineColor: '#ff6a6a', //网格线的颜色 #ed7b10
                minorGridLineColor: '#eda8b7', //次级网格线的颜色 b0a091
                minorGridLineWidth: 0.5, //次级网格线的宽度
                minorTickInterval: 40, //次级网格的间距 0.04S
                labels: {
                    enabled: false
                        //是否显示x轴
                }

            },
            series: [
            {
                type: 'line',
                states: {
                    hover: {
                        enabled: false
                    }
                },
                pointStart: startdt + Hz + 300, // 第一个点的时间
                pointInterval: Hz, // 频率
                pointIntervalUnit: 'milliseconds',
                dashStyle: 'solid',
                data: objDt.data,
                zoneAxis: 'x',
                lineWidth: 1,

                zones: [
                {
					value: 1429157533000,
					color: '#000',
                    dashStyle: 'solid'
				},
				{
					value: 1429157534000,
					color: '#f7a35c',
                    dashStyle: 'Dot'
				},
				{
                    color: '#000000', //设置折线的颜色
                }],
                enabled: true
            },
            {
                type: 'line',
                states: {
                    hover: {
                        enabled: false
                    }
                },
                pointStart: startdt + Hz, // 第一个点的时间
                pointInterval: Hz, // 频率
                pointIntervalUnit: 'milliseconds',
                data: startData,
                lineWidth: 1,
                zones: [{
                    color: '#000000', //设置折线的颜色
                }],
                enabled: true
            }
            ],
            credits: {
                enabled: false,
                // text: 'hk-bithealth.com',
                // href: 'http://www.hk-bithealth.com',
                // position: {
                //     align: 'right'
                // }
            },
            scrollbar: {
                enabled: true,
                // barBackgroundColor: 'gray',
                // barBorderRadius: 7,
                // barBorderWidth: 0,
                // buttonBackgroundColor: 'gray',
                // buttonBorderWidth: 0,
                // buttonArrowColor: 'yellow',
                // buttonBorderRadius: 7,
                // rifleColor: 'yellow',
                // trackBackgroundColor: 'white',
                // trackBorderWidth: 1,
                // trackBorderColor: 'silver',
                // trackBorderRadius: 7
            }
        });
 	console.log(chartbox.highcharts());
        //        chartbox.highcharts().hideLoading();
        // var dtBox = $(".highcharts-range-selector");
        // dtBox.attr("readonly", "readonly");
    }

    //瞬时心率图 instantChart hr_ecg
    if (chartbox.length > 0 && id == "instantChart") {
        chartbox.highcharts({
            chart: {
                type: 'line',
                plotBackgroundColor: 'rgba(238, 254, 238, 1)',
                plotBorderColor: '#000',
                plotBorderWidth: 1,
            },
            title: {
                text: ' ',
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    // step: 2,
                    enabled: false,
                    format: '{value:%H:%M:%S}'
                },
                tickWidth: 1,
                tickLength: 0,
                tickColor: '#000',
                lineColor: '#000',
                lineWidth: 1,
            },
            yAxis: {
                // offset: 5,
                min: minValue,
                max: maxValue,
                tickInterval: 25, //每大格25
                gridLineWidth: 0,
                tickWidth: 1,
                tickLength: 5,
                tickColor: '#000',
                // lineColor: '#000',
                // lineWidth: 1,
                title: {
                    text: ' '
                },
                plotLines: [{
                    value: 50,
                    width: 1,
                    color: 'red',
                    zIndex: 1,
                    label: {
                        text: '正常值范围',
                        y: -20,
                        align: 'center',
                        style: {
                            color: 'red',
                            fontSize: 18
                        },

                    }
                }, {
                    value: 100,
                    width: 1,
                    color: 'red'
                }, ]
            },

            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false,
                    },
                    enableMouseTracking: false,
                    marker: {
                        enabled: false,
                    }
                }
            },
            exporting: {
                enabled: false
            },
            series: [{
                data: objDt.data,
                pointStart: startdt,
                pointInterval: 10 * 1000,
                lineWidth: 1,
                zones: [{
                    color: '#000' //设置折线的颜色
                }],
            }],
            credits: {
                enabled: false,
            },
            legend: {
                enabled: false,
            },
        });
        var chart = chartbox.highcharts();
        chart.setTitle({
            text: startTime + " 至 " + endTime
        });
    }
    //脉搏波图 sphygmusChart ppg
    if (chartbox.length > 0 && id == "sphygmusChart") {
        chartbox.highcharts({
            chart: {
                type: 'line',
                plotBackgroundColor: 'rgba(238, 254, 238, 1)',
                plotBorderColor: '#000',
                plotBorderWidth: 1,
                height: objDt.height,
                width: objDt.width,
            },
            title: {
                text: ' ',
            },
            xAxis: {
                labels: {
                    step: 5,
                    align: 'left',
                    format: '{value:%Y-%m-%d %H:%M:%S}'
                },
                type: 'datetime',
                tickWidth: 1,
                tickLength: 5,
                tickColor: '#000',
                lineColor: '#000',
                lineWidth: 1,
            },
            yAxis: {
                labels: {
                    enabled: false,
                },
                min: minValue,
                max: maxValue,
                tickInterval: 22, //每大格22
                gridLineWidth: 0,
                tickWidth: 0,
                tickLength: 5,
                tickColor: '#000',
                title: {
                    text: ' '
                },
            },

            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false,
                    },
                    enableMouseTracking: false,
                    marker: {
                        enabled: false,
                    }
                }
            },
            exporting: {
                enabled: false
            },
            series: [{
                data: objDt.data,
                pointStart: startdt,
                pointInterval: Hz,
                lineWidth: 1,
                zones: [{
                    color: '#000' //设置折线的颜色
                }],
            }],
            credits: {
                enabled: false,
            },
            legend: {
                enabled: false,
            },
        });
        //        var chart = chartbox.highcharts();
        //        chart.setTitle({
        //            text: Highcharts.dateFormat('%Y-%m-%d %H:%M:%S:%L', chart.series[0].xAxis.min) + " 至 " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S:%L', chart.series[0].xAxis.max)
        //        });
    }
    // 瞬时脉率图  instantSphygmusChart hr_ppg
    if (chartbox.length > 0 && id == "instantSphygmusChart") {
        chartbox.highcharts({
            chart: {
                type: 'line',
                plotBackgroundColor: 'rgba(238, 254, 238, 1)',
                plotBorderColor: '#000',
                plotBorderWidth: 1,
            },
            title: {
                text: ' ',
            },
            xAxis: {
                labels: {
                    // step: 2,
                    enabled: false,
                    format: '{value:%H:%M:%S}'
                },
                type: 'datetime',
                //                tickWidth: 0,
                tickLength: 0,
                //                tickColor: '#000',
                lineColor: '#000',
                lineWidth: 1,
            },
            yAxis: {
                // offset: 5,
                min: minValue,
                max: maxValue,
                tickInterval: 25, //每大格25
                gridLineWidth: 0,
                tickWidth: 1,
                tickLength: 5,
                tickColor: '#000',
                title: {
                    text: ' '
                },
                plotLines: [{
                    value: 50,
                    width: 1,
                    color: 'red',
                    zIndex: 1,
                    label: {
                        text: '正常值范围',
                        y: -20,
                        align: 'center',
                        style: {
                            color: 'red',
                            fontSize: 18
                        },

                    }
                }, {
                    value: 100,
                    width: 1,
                    color: 'red'
                }, ]
            },

            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false,
                    },
                    enableMouseTracking: false,
                    marker: {
                        enabled: false,
                    }
                }
            },
            exporting: {
                enabled: false
            },
            series: [ {
                data: objDt.data,
                pointStart: startdt,
                pointInterval: 1,
                lineWidth: 1,
                zones: [{
                    color: '#000' //设置折线的颜色
                }],
            }
            ],
            credits: {
                enabled: false,
            },
            legend: {
                enabled: false,
            },
        });
        var chart = chartbox.highcharts();

        chart.setTitle({
            text: startTime + " 至 " + endTime
        });
    }
}

function startLine() {
 return [134,134,134,134,134,134,134,134,134,134,
            134,134,134,134,134,134,134,134,134,134,
            800,800,800,800,800,800,800,800,800,
            800,800,800,800,800,800,800,800,800,
            800,800,800,800,800,800,800,800,800,
            800,800,800,800,800,800,800,800,800,
            134,134,134,134,134,134,134,134,134,134,
            134,134,134,134,134,134,134,134,134,134];
}

function getObj() {
    var obj = {
        "height": 300,
        "page": 1,
        "width": 1000,
        "data": [-7, 0, 5, 6, -53, -176, -224, -199, -178, -160, -143, -129, -117, -107, -99, -91, -85, -80, -80, -85, -94, -108, -118, -124, -126, -123, -122, -123, -126, -131, -131, -127, -117, -104, -87, -67, -43, -17, 3, 20, 32, 39, 41, 38, 30, 18, 5, -7, -20, -33, -47, -60, -74, -88, -98, -103, -104, -101, -101, -105, -112, -123, -131, -135, -127, -106, -92, -83, -81, -86, -88, -90, -89, -88, -85, -80, -75, -68, -60, -52, -44, -34, -25, -14, -3, 7, 12, 10, 2, -12, -22, -26, -25, -19, -15, -13, -13, -16, -20, -27, -36, -47, -54, -56, -54, -48, -38, -23, -3, 19, 33, 36, 29, 11, -2, -12, -19, -23, -25, -25, -23, -20, -15, -8, 0, 10, 19, 27, 33, 38, 72, 134, 225, 345, 431, 483, 502, 488, 377, 171, -8, -162, -269, -327, -338, -301, -263, -226, -189, -151, -119, -92, -70, -54, -43, -36, -35, -39, -41, -44, -45, -45, -45, -43, -41, -38, -35, -33, -30, -28, -26, -24, -23, -21, -21, -20, -20, -20, -20, -21, -22, -24, -25, -27, -28, -29, -30, -31, -32, -32, -32, -32, -32, -31, -31, -29, -28, -26, -25, -26, -28, -31, -35, -40, -47, -55, -60, -63, -64, -63, -60, -54, -46, -35, -27, -20, -15, -12, -10, -10, -10, -12, -13, -13, -7, 6, 8, 0, -19, -50, -60, -49, -37, -23, -17, -18, -26, -41, -49, -50, -44, -31, -26, -28, -39, -58, -68, -68, -58, -39, -28, -23, -26, -36, -44, -51, -57, -61, -63, -64, -64, -62, -62, -64, -67, -71, -79, -89, -102, -118, -124, -121, -107, -83, -62, -43, 27, 150, 252, 332, 392, 430, 373, 219, 67, -83, -186, -240, -245, -202, -163, -128, -97, -71, -48, -27, -10, 2, 13, 22, 27, 29, 31, 33, 34, 36, 37, 38, 39, 39, 39, 38, 37, 35, 31, 26, 20, 13, 10, 13, 20, 33, 40, 42, 39, 31, 26, 24, 24, 28, 31, 33, 34, 34, 34, 33, 31, 29, 27, 23, 20, 15, 14, 17, 23, 34, 38, 35, 27, 13, 5, 5, 11, 24, 30, 28, 18, 0, -12, -18, -19, -13, -7, 0, 7, 16, 23, 29, 33, 35, 36, 36, 33, 29, 25, 22, 18, 16, 14, 12, 10, 9, 9, 9, 11, 14, 17, 19, 21, 22, 25, 27, 30, 34, 36, 37, 37, 36, 33, 29, 24, 17, 10, 2, -6, -16, -24, -30, -36, -40, -41, -40, -36, -30, -30, -37, -51, -72, -63, -25, 44, 144, 236, 319, 393, 459, 424, 290, 115, -99, -239, -303, -293, -207, -139, -88, -55, -40, -27, -15, -5, 3, 10, 15, 19, 22, 24, 26, 29, 31, 34, 36, 39, 41, 44, 47, 49, 52, 54, 57, 60, 62, 65, 67, 69, 71, 72, 74, 75, 75, 76, 76, 76, 75, 74, 72, 70, 68, 65, 62, 59, 55, 50, 46, 41, 35, 30, 26, 23, 20, 17, 16, 15, 15, 14, 12, 10, 7, 3, -1, -6, -13, -16, -18, -18, -15, -14, -14, -15, -17, -18, -19, -19, -18, -16, -13, -9, -5, -2, 0, 0, 0, -2, -5, -9, -15, -19, -22, -23, -23, -21, -18, -14, -8, -3, -1, 0, 0, -1, -4, -9, -15, -23, -33, -44, -57, -68, -77, -85, -92, -96, -98, -99, -98, -94, -89, -82, -73, -71, -76, -88, -108, -94, -48, 31, 145, 237, 308, 359, 388, 352, 250, 98, -103, -241, -314, -324, -269, -223, -184, -153, -130, -109, -90, -74, -60, -49, -39, -32, -28, -24, -20, -18, -15, -14, -13, -12, -12, -11, -9, -7, -3, 2, 10, 21, 35, 40, 38, 41, 50, 57, 61, 62, 62, 61, 60, 60, 59, 59, 58, 57, 56, 55, 53, 51, 49, 47, 45, 43, 40, 38, 36, 34, 32, 30, 29, 27, 26, 25, 24, 23, 23, 22, 22, 22, 22, 21, 20, 18, 15, 12, 7, 2, -2, -7, -9, -10, -10, -7, -4, 1, 8, 13, 17, 19, 19, 18, 15, 10, 4, 0, -3, -5, -5, -4, -2, 1, 7, 10, 12, 12, 10, 7, 2, -4, -13, -24, -38, -54, -73, -85, -90, -90, -85, -80, -75, -70, -66, -62, -58, -55, -52, -58, -74, -99, -133, -123, -68, 30, 174, 279, 346, 375, 365, 290, 147, -13, -194, -313, -371, -368, -303, -253, -216, -193, -185, -174, -159, -142, -122, -99, -73, -45, -13, 12, 32, 46, 54, 56, 52, 42, 26, 13, 5, 0, 0, 1, 7, 17, 31, 42, 50, 56, 60, 60, 59, 54, 47, 49, 59, 77, 104, 117, 118, 105, 79, 59, 43, 33, 28, 27, 30, 37, 48, 58, 65, 70, 73, 75, 74, 72, 68, 64, 60, 57, 55, 53, 51, 50, 50, 50, 51, 53, 56, 60, 65, 71, 78, 80, 77, 68, 54, 46, 42, 44, 50, 55, 59, 61, 62, 62, 60, 57, 52, 48, 44, 41, 39, 37, 35, 35, 34, 31, 24, 14, 0, -7, -10, -8, -1, -10, -35, -59, -81, -94, -99, -96, -84, -75, -69, -65, -64, -67, -72, -81, -93, -107, -123, -141, -161, -136, -66, 49, 210, 317, 370, 368, 313, 205, 44, -82, -175, -233, -255, -242, -193, -150, -113, -82, -57, -36, -19, -7, 0, 4, 4, 0, -7, -14, -19, -23, -24, -24, -23, -20, -15, -13, -13, -17, -23, -25, -25, -23, -17, -11, -6, 0, 4, 8, 13, 17, 21, 25, 28, 31, 34, 36, 38, 39, 40, 41, 41, 41, 40, 39, 37, 35, 32, 29, 26, 24, 22, 20, 18, 16, 15, 13, 12, 11, 10, 9, 9, 8, 8, 8, 8, 9, 10, 11, 13, 15, 18, 19, 20, 20, 19, 18, 15, 12, 9, 4, 0, -6, -13, -18, -22, -27, -32, -33, -31, -17, 8, 22, 24, 15, -5, -20, -28, -30, -25, -25, -30, -39, -53, -62, -65, -63, -56, -52, -53, -57, -65, -73, -82, -90, -99, -107, -116, -125, -133, -128, -108, -74, -25, 43, 132, 242, 371, 422, 395, 290, 107, -60, -211, -287, -286, -278, -263, -240, -209, -184, -165, -151, -143, -134, -125, -116, -106, -98, -92, -88, -85, -82, -78, -73, -68, -62, -55, -48, -39, -33, -27, -23, -20, -19, -18, -19, -22, -15, 0, 25, 59, 79, 86, 78, 57, 44, 38, 41, 51, 58, 62, 62, 59, 56, 54, 53, 53, 53, 53, 54, 56, 57, 58, 58, 56, 55, 52, 49, 45, 42, 39, 36, 33, 31, 30, 29, 28, 28, 29, 31, 34, 38, 42, 48, 54, 55, 49, 37, 19, 7, 0, 0, 4, 8, 11, 14, 17, 18, 20, 21, 21, 21, 20, 19, 17, 15, 12, 8, 4, 0, -4, -8, -14, -19, -25, -31, -37, -40, -41, -40, -36, -30, -21, -9, 4, 12, 14, 9, 0, -17, -39, -68, -103, -106, -78, -19, 71, 149, 213, 264, 302, 272, 174, 40, -127, -231, -270, -267, -220, -177, -139, -106, -77, -57, -44, -39, -42, -44, -44, -44, -42, -39, -33, -26, -16, -8, -1, 4, 8, 11, 13, 14, 14, 14, 15, 17, 20, 23, 27, 32, 38, 42, 46, 48, 49, 48, 47, 44, 40, 37, 34, 31, 29, 28, 26, 26, 25, 24, 22, 19, 16, 11, 6, 0, -7, -12, -15, -16, -15, -11, -6, 0, 10, 18, 24, 28, 31, 32, 32, 30, 26, 22, 18, 14, 11, 7, 3, 0, -3, -6, -7, -7, -6, -4, -1, 3, 9, 14, 17, 20, 22, 23, 23, 22, 20, 18, 15, 13, 11, 8, 6, 3, 1, -4, -12, -23, -36, -47, -56, -62, -67, -71, -76, -80, -86, -91, -97, -103, -110, -116, -122, -126, -131, -110, -64, 6, 101, 199, 298, 345, 339, 296, 216, 98, -56, -167, -235, -259, -239, -217, -191, -164, -133, -107, -84, -66, -51, -40, -32, -28, -27, -26, -25, -25, -25, -25, -26, -26, -27, -27, -27, -26, -25, -24, -21, -19, -15, -11, -5, 2, 11, 21, 33, 47, 61, 73, 82, 87, 90, 90, 86, 80, 70, 62, 55, 51, 47, 46, 46, 47, 50, 52, 53, 53, 51, 49, 45, 41, 35, 30, 25, 21, 17, 13, 11, 8, 6, 5, 5, 6, 7, 9, 12, 15, 19, 21, 21, 18, 13, 10, 7, 5, 5, 2, 0, -6, -13, -16, -13, -6, 6, 13, 15, 12, 4, 0, -3, -2, 0, 2, 2, 2, 0, -2, -7, -12, -19, -25, -30, -34, -38, -40, -42, -43, -43, -43, -42, -41, -39, -37, -34, -31, -27, -14, 7, 39, 80, 128, 183, 246, 317, 327, 278, 171, 4, -115, -188, -215, -196, -170, -137, -104, -70, -45, -30, -23, -26, -28, -29, -29, -29, -28, -25, -22, -18, -15, -13, -11, -11, -10, -8, -6, -3, 0, 3, 7, 11, 15, 20, 25, 30, 35, 39, 41, 44, 45, 46, 46, 45, 45, 46, 48, 51, 55, 61, 67, 74, 78, 81, 80, 77, 70, 61, 48, 31, 21, 16, 18, 25, 19, 0, -3, 10, 20, 26, 29, 29, 28, 28],
        "fs": 250,
        "measureTime": 1429157532000,
        "type": "ecg"
    };
    console.log(obj.data);
    return obj;
}
