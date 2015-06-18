using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace HighchartAlertDialog
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = string.IsNullOrEmpty(Request["action"]) ? string.Empty : Request["action"];
            switch (action)
            {
                case "GetDetailData":
                    GetDetailData();
                    break;
                default:
                    break;
            }
        }
        private void GetDetailData()
        {
            Response.Write("{\"msg\":\"输出你的ajax图表数据\"}");
            Response.End();
        }
    }
}