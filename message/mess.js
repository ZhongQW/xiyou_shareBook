/*
    Create by WebStorm.
    User: ZhongQw
    Date: 2018/12/16
    Time: 15:13
*/
window.onload = function(){
    let storage = window.localStorage;
    // alert('aa');
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/overdue",
        headers: {'Authorization': storage.token},
        data: {
        },
        success: function(res) {
            let data = JSON.parse(res);
            console.log(data);
            if(data!="") {
                for (let i = 0; i < data.length; i++) {
                    let str = "    <li>\n" +
                        "        <i class=\"fa fa-bell\" aria-hidden=\"true\"></i>\n" +
                        "        <span>你的《" + data[i].name + "》已经逾期" + data[i].day + "天！不能借书。</span>\n" +
                        "    </li>";
                    $(str).appendTo("#div");
                }
            }else{
                let str = "    <li>\n" +
                    "        <i class=\"fa fa-bell\" aria-hidden=\"true\"></i>\n" +
                    "        <span>暂无消息</span>\n" +
                    "    </li>";
                $(str).appendTo("#div");
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
};