$(function() {
    //Highcharts 全局设置 语言
    
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
    if ($("#container").length > 0) {
        var $report = $('#report');
        var data = getData();
        var gInfo;


        // 创建highcharts 
        window.chart = new Highcharts.StockChart({
            chart: {
                renderTo: 'container', //对应的div id
                borderWidth: '1', //图表外边框的宽度
                panning: false, //禁用放大
                pinchType: '', //禁用手势操作
                zoomType: "",
            },
            //选中缩放的地方
            rangeSelector: {
                inputEnabled: true,
                buttons: [
                    // {
                    //     type: 'second',
                    //     count: 2,
                    //     text: '1秒'
                    // }, {
                    //     type: 'all',
                    //     text: '全部'
                    // }
                ],
                buttonTheme: {
                    width: 50
                },
                inputDateFormat: '%H:%M:%S.%L',
                inputEditDateFormat: '%H:%M:%S.%L',
                // 格式化form 和TO
                inputDateParser: function(value) {
                    value = value.split(/[:\.]/);
                    console.log(value);
                    return Date.UTC(
                        2015,
                        05,
                        28,
                        11 + parseInt(value[0], 10),
                        23 + parseInt(value[1], 10),
                        05 + parseInt(value[2], 10),
                        parseInt(value[3], 10)
                    );
                }
            },
            //图表缩放导航
            navigator: {
                enabled: false,
            },
            exporting: {
                enabled: false
            },
            title: {
                text: ' '
            },
            yAxis: {
                min: -2000,
                max: 2000,
                tickInterval: 500, //每大格0.5 毫伏
                gridLineWidth: 1,
                gridLineColor: '#ed7b10', //#ed7b10
                minorGridLineWidth: 0.5, //次级网格线的宽度 0.5
                minorGridLineColor: '#b0a091', //次级网格线的颜色 b0a091
                minorTickInterval: 100, //次级网格的间隔 0.1毫伏 
                labels: {
                    enabled: false //是否显示y轴
                }
            },
            tooltip: {
                enabled: false,
                crosshairs: false //跟随光标的精准线
            },
            xAxis: {
                type: 'datetime',
                // min : startdt, //起始时间
                // minRange: 2000, //最小放大比例 1S
                tickPixelInterval: 100, //网格间隔宽度默认100
                tickLength: 0, //刻度线的长度
                tickInterval: 200, //每大格0.2S
                gridLineWidth: 1, //网格线的宽度
                gridLineColor: '#ed7b10', //网格线的颜色 #ed7b10
                minorGridLineColor: '#b0a091', //次级网格线的颜色 b0a091
                minorGridLineWidth: 0.5, //次级网格线的宽度
                minorTickInterval: 40, //次级网格的间距 0.04S
                labels: {
                    enabled: false //是否显示x轴
                }

            },
            //设置鼠标一上去时不显示点
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                type: 'line',
                //设置鼠标一上去时不显示点
                states: {
                    hover: {
                        enabled: false
                    }
                },
                pointInterval: 1000 / 150, // 频率
                data: data,
                zones: [{
                    color: '#000' //设置折线的颜色
                }],
                enabled: true
            }],
            credits: {
                enabled: false,
                // text: 'hk-bithealth.com',
                // href: 'http://www.hk-bithealth.com',
                // position: {
                //     align: 'right'
                // }
            },
            scrollbar: {
                enabled: false, //禁用
                barBackgroundColor: 'gray',
                barBorderRadius: 7,
                barBorderWidth: 0,
                buttonBackgroundColor: 'gray',
                buttonBorderWidth: 0,
                buttonArrowColor: 'yellow',
                buttonBorderRadius: 7,
                rifleColor: 'yellow',
                trackBackgroundColor: 'white',
                trackBorderWidth: 1,
                trackBorderColor: 'silver',
                trackBorderRadius: 7
            }
        });
    }
    if ($("#instantChart").length > 0) {
        $('#instantChart').highcharts({
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
                },
                type: 'datetime',
                tickWidth: 1,
                tickLength: 5,
                tickColor: '#000',
                lineColor: '#000',
                lineWidth: 1,
            },
            yAxis: {
                // offset: 5,
                min: 0,
                max: 175,
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
                data: [75, 74, 77, 70, 72, 73, 73, 75, 73, 74, 73, 77],
                pointStart: 1433233483000,
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
        var chart = $('#instantChart').highcharts();
        chart.setTitle({
            text: Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', chart.series[0].xAxis.min) + " 至 " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', chart.series[0].xAxis.max)
        });
    }

    if ($("#sphygmusChart").length > 0) {
        var startDt, endDt;
        $('#sphygmusChart').highcharts({
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
                },
                type: 'datetime',
                tickWidth: 1,
                tickLength: 5,
                tickColor: '#000',
                lineColor: '#000',
                lineWidth: 1,
            },
            yAxis: {
                // offset: 5,
                min: 0,
                max: 88,
                tickInterval: 22, //每大格22
                gridLineWidth: 0,
                tickWidth: 1,
                tickLength: 5,
                tickColor: '#000',
                // lineColor: '#000',
                // lineWidth: 1,
                title: {
                    text: ' '
                },
                // plotLines: [{
                //     value: 50,
                //     width: 1,
                //     color: 'red',
                //     zIndex: 1,
                //     label: {
                //         text: '正常值范围',
                //         y: -20,
                //         align: 'center',
                //         style: {
                //             color: 'red',
                //             fontSize: 18
                //         },

                //     }
                // }, {
                //     value: 100,
                //     width: 1,
                //     color: 'red'
                // }, ]
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
                data: [67, 68, 69, 45, 43, 42, 22, 21, 22, 23, 45, 67],
                pointStart: 1433233483000,
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
        var chart = $('#sphygmusChart').highcharts();
        chart.setTitle({
            text: Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', chart.series[0].xAxis.min) + " 至 " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', chart.series[0].xAxis.max)
        });
    }

        if ($("#instantSphygmusChart").length > 0) {
        $('#instantSphygmusChart').highcharts({
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
                },
                type: 'datetime',
                tickWidth: 1,
                tickLength: 5,
                tickColor: '#000',
                lineColor: '#000',
                lineWidth: 1,
            },
            yAxis: {
                // offset: 5,
                min: 0,
                max: 175,
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
                data: [75, 74, 77, 70, 72, 73, 73, 75, 73, 74, 73, 77],
                pointStart: 1433233483000,
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
        var chart = $('#instantSphygmusChart').highcharts();
        chart.setTitle({
            text: Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', chart.series[0].xAxis.min) + " 至 " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', chart.series[0].xAxis.max)
        });
    }

});




function getData() {
    return [257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 257, 511, -1, -255, 257, 257, 257, 257, 257, 257, 257, 511, -1, -1, -1, -1, -1, -1, -165, 2561, 0, 0, 257, 257, 256, 0, 0, 0, 0, 0, 0, 0, 35, -25374, -769, -1, -1, -32498, 256, 0, 0, 0, 0, 0, 0, 1392, -19275, -27007, 29091, 30480, 256, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17129, -513, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -53, -32663, 23896, 13598, 4880, 523, 2346, 24983, -22894, 30300, 13578, 256, 0, 32, 11796, 512, 0, 0, 0, 41, -17416, -257, -1, -1, -1, -1, -1, -1, -1, -1, -1, -156, 2817, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, -31813, -25469, -31866, 30057, 29048, 32114, 24423, 30316, 22075, 20338, -31872, 27989, 16444, 21627, -25925, -3842, -1, -2, -4127, -10552, -14132, -14126, -6924, -257, -4, -3614, -14421, -22602, -21349, -27252, 31878, -25426, -17463, -12339, -14661, -21858, -25188, -27768, -32132, 31348, 27488, 23640, 23134, 25444, 23633, 19266, 13361, 14924, 23647, 23127, 21848, 23909, 26476, 26979, 24408, 20549, 15149, 8217, 2566, 5926, 13888, 16451, 19280, 20294, 16446, 16451, 20832, 27509, 32647, -30075, -32386, 30829, 25430, 19270, 18253, 18494, 14639, 10032, 18252, 19793, 22112, 27765, 30595, -30073, 30062, 27756, 30882, -21864, -26982, -27246, -26726, -25702, -25703, -24908, -22622, -21591, -25707, -31102, -27744, -18247, -24172, -30082, 31093, 30067, 29292, 25699, 28288, -28783, -19229, -11085, -23373, -20833, -25446, -29529, -7176, -14661, -18250, -21349, -28783, -26980, -29056, -29038, 32618, 25438, 24674, 25702, 26732, 29046, 31372, -26739, -30582, -30331, -31870, -32642, -32642, 31611, 32126, -32373, -25949, -23909, -30324, -26733, -26164, -17253, -30078, 32397, -31623, 29296, 28779, 27499, 26470, 27762, 28261, 24419, 25956, 26212, 26753, -30060, -28800, 29805, 28785, 29044, 30070, 32393, -30850, 29805, 26988, 32397, -29050, 32378, 30841, 30841, 30321, 27755, 27502, 27756, 27495, 25956, 26732, 29044, 29810, 29042, 28782, 26985, 27497, 27762, 29297, 29302, 31612, 32383, -32123, -30840, -30844, -31104, 31093, 29814, 30584, 31097, 32126, -32382, 32639, -32640, 31867, 32383, -32639, -31868, -30841, -30585, -30070, -30329, -31353, -31097, -30583, -30323, -29814, -29299, -29297, -28016, -29303, -30839, -30329, -30324, -29301, -30330, -31618, 30315, 27254, -30322, -29818, -32126, -32127, 32384, -32638, -32384, -32385, 31865, 30325, 30066, 29298, 29039, 28786, 28782, 28267, 26985, 27237, 26217, 26469, 25959, 26988, 28783, 28531, 30321, 28529, 29300, -32363, -23389, -27251, -30589, -32385, 32638, 32640, -31607, -28524, -26988, -28790, -30842, -32127, 31866, 30582, 30323, 29554, 29555, 29043, 30583, 30327, 31353, 31095, 30837, 29812, 29812, 30329, 31097, 31099, 30839, 30320, 26986, 30605, -25960, -27505, -29041, -28786, -29045, -30329, -30840, -30327, -29557, -30072, -31354, -31097, -31358, -32383, 31866, 31870, 32127, -32384, -32122, -30839, -30586, -30324, -29298, -29040, -27754, -26731, -26987, -28272, -28788, -29044, -29553, -28782, -27762, -29044, -30324, -29302, -29812, -29043, -29555, -29297, -28269, -28012, -28017, -29300, -29554, -29040, -28013, -27502, -28789, -30842, -31097, -30584, -30582, -29815, -31362, 30578, 31115, -25957, -26994, -29813, -30324, -29041, -28015, -27755, -26728, -26474, -27759, -28528, -28789, -30580, -28529, -28270, -28010, -26982, -25701, -25440, -23643, -21840, -19535, -19793, -21847, -22360, -21588, -21073, -20818, -20818, -20556, -19021, -19018, -18504, -17729, -16447, -15418, -14906, -14905, -13882, -14650, -15681, -16964, -18247, -18507, -19277, -19794, -21847, -21589, -22359, -21588, -22365, -23650, -26216, -28024, 32640, -29027, -24422, -27760, -29560, -30586, -31094, -30844, -30840, -30584, -30843, -31865, -31613, -31868, -31615, -32643, 32126, -32385, 31868, 31098, 30839, 31867, 30321, 29051, -31094, -30330, 32116, 29042, 28779, 27755, 25949, 23905, 26219, 28277, -32629, -27238, -24921, -20049, -21591, -22367, -28550, 25943, 20298, 18773, 25449, 29568, -29534, -17979, -13619, -12595, -12863, -19287, -27002, 31864, 30837, 28522, 26986, 26463, 22872, 24435, -32127, 31597, 23888, 20306, 23133, 24419, 26472, 25954, 25184, 24672, 25189, 26211, 23380, 20300, 20046, 21081, 22868, 19790, 20820, 21328, 19789, 18246, 17995, 21075, 22877, 26744, -30057, -24671, -23897, -22612, -21073, -19787, -21095, -29565, 31350, 29301, 31606, 32402, -24916, -17724, -12333, -13379, -21353, -31372, 27237, 25183, 24414, 24674, 26220, 27497, 27504, 31368, -26716, -19779, -14641, -13899, -23405, -29805, -25703, -26990, -30336, 30832, 28797, -28508, -18498, -17741, -22105, -23389, -23898, -22868, -19533, -17986, -16712, -21342, -24929, -27002, 30836, 27747, 23119, 16950, 11302, 8225, 11573, 14913, 19802, 26479, 29819, -31610, -32140, 26461, 23400, 29823, -31596, -23118, -14892, -8736, -5149, -10541, -9501, -5662, -10034, -18019, -29311, 30307, 23129, 19775, 11809, 5892, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2073, 10814, 22898, -31598, -25950, -21583, -17728, -16718, -21855, -28838, 12328, 8997, 14676, 26222, 29045, 32644, -29548, -25157, -12335, -13376, -18000, -21595, -25962, -25954, -24157, -23384, -21594, -26222, -29816, -31613, 32638, 29284, 24147, 19011, 12320, 13915, 20051, 24643, 10790, 11565, 12081, 12840, 8217, 3597, 5145, 6945, 11326, 18515, 22105, 23388, 22612, 21342, 26221, 31871, 32124, -32636, -32129, 30840, 29818, -27992, -20566, -23136, -25704, -27503, -29557, -29553, -27494, -24931, -26731, -28538, 32123, -31615, 31606, 31096, 30332, -30830, -27244, -27500, -27501, -26982, -26215, -25961, -26985, -26471, -25705, -28532, -29814, -30070, -29552, -28786, -28533, -29555, -28778, -25700, -25444, -26220, -29560, -31101, -32383, -32383, 32638, 31870, 32381, 32124, 31869, 31610, 31354, 31354, 31096, 31353, 31353, 31100, 32125, 32120, 30843, 32124, 31610, 30581, 29037, 25691, 24175, -30833, -29562, 32119, 30068, 28783, 27754, 27757, 27497, 27239, 26475, 26985, 28014, 28016, 29039, 28785, 29808, 27494, 25439, 23384, 21849, 22871, 22874, 23386, 22877, 24673, 25447, 27757, 28270, 28009, 26727, 26217, 26726, 26215, 26985, 26727, 25957, 26472, 26730, 26986, 27755, 27244, 28269, 28527, 28786, 28785, 29810, 29296, 28272, 29298, 28785, 29815];
}

function deleteDT() {
    var chart = $('#container').highcharts();
    console.log(chart.xAxis[0].min);
    console.log(chart.xAxis[0].max);
}
