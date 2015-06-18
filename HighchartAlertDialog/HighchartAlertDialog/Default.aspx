<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="HighchartAlertDialog._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>highchart 弹出图表例子</title>
    <script type="text/javascript" src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="http://cdn.hcharts.cn/highcharts/4.0.3/highcharts.js"></script>
     <script src="Scripts/lhgdialog/lhgdialog.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <center style="padding-top: 150px;">
        <div id="container">
        </div>
    </center>
    </form>
    <script type="text/javascript">
    
        $(function () {
    $('#container').highcharts({
        chart: {
            type: 'column',
            width:600,
            height:400,
            margin: [ 50, 50, 100, 80]
        },
        title: {
            text: '文章时间走势'
        },
        xAxis: {
            categories: [
                '2014-12-01',
                '2014-12-02',
                '2014-12-03',
                '2014-12-04',
                '2014-12-05',
                '2014-12-06',
                '2014-12-07',
                '2014-12-08',
                '2014-12-09',
                '2014-12-10'   
            ],
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        plotOptions:{
            series: {
                cursor: "pointer",
                point: {
                    events: {
                        click: function () {
                            showDetails(this.category);
                        }
                    }

                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: "Population in 2008: <b>{point.y:.1f} millions</b>",
        },
        series: [{
            name: 'Population',
            data: [34.4, 21.8, 20.1, 20, 19.6, 19.5, 19.1, 18.4, 18,
                17.3],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        }]
    });
});
    function showDetails(t)
    {
        $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        data: "",
        url: window.location.href+"?action=GetDetailData",
        beforeSend: function () {
            //ajax 加载之前要执行的操作
        },
        success: function (result) {
            
            $.dialog({
                id: "BigImg",
                esc: true,
                content: '<div style="height:' + $(window).height() * 0.70 + 'px;"><div id="div_big_img"></div></div>',
                width: $(window).width() * 0.62,
                height: $(window).height() * 0.70,
                title: '数据明细',
                init: function () {
                   
                     $('#div_big_img').highcharts({
        chart: {
            type: 'column',
            width:600,
            height:400,
            margin: [ 50, 50, 100, 80]
        },
        title: {
            text: '文章时间走势'
        },
        xAxis: {
            categories: [
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00'   
            ],
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: "Population in 2008: <b>{point.y:.1f} millions</b>",
        },
        series: [{
            name: 'Population',
            data: [34.4, 11.8, 20.1, 20, 19.6, 9.5, 19.1, 18.4, 8, 17.3],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        }]
    });

                },
                max: false,
                min: false,
                fixed: true,
                lock: true
            });
        }
    });
    }
    </script>
</body>
</html>
