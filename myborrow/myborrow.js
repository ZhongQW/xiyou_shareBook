/*
    Create by WebStorm.
    User: ZhongQw
    Date: 2018/12/16
    Time: 16:54
*/
function restore(event){
    let storage=window.localStorage;
    let id = event.parentNode.parentNode.getAttribute("data-index-op");
    let data = {};
    data = {
        bookId: parseInt(id)
    };
    data = JSON.stringify(data);
    console.log(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/returnbook",
        headers: {'Authorization': storage.token},
        data: data,
        success: function(res) {
            let json = JSON.parse(res);
            if (json.status) {
                alert("还书成功！");
                location.reload();
            }else{
                alert('还书失败！');
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
window.onload = function(){
    let storage = window.localStorage;
    console.log(storage.token);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/allrent",
        headers: {'Authorization': storage.token},
        data: {},
        success: function (res) {
            let data = JSON.parse(res);
            if(data.length != 0) {
                let ss = "<table id=\"borrowTable\">\n" +
                    "        <caption>\n" +
                    "            <h2>我的借阅</h2>\n" +
                    "        </caption>\n" +
                    "        <thead>\n" +
                    "            <th class=\"col-md-2\">书籍名称</th>\n" +
                    "            <th class=\"col-md-2\">最晚还书时间</th>\n" +
                    "            <th class=\"col-md-2\">操作</th>\n" +
                    "        </thead>\n" +
                    "        <tbody></tbody></table>";
                $(ss).appendTo(".container");
                for (let i = 0; i < data.length; i++) {
                    let str = "    <tr data-index-op = '" + data[i].bookId + "'>\n" +
                        "            <td>" + data[i].bookName + "</td>\n" +
                        "            <td>" + data[i].endDate + "</td>\n" +
                        "            <td><button  onclick=\"restore(this)\" class=\"returnBooks\">\n" +
                        "                    还书\n" +
                        "                </button></td>\n" +
                        "        </tr>";
                    $(str).appendTo("#borrowTable tbody");
                }
            }else{
                let str = "<div class='none_book'>" +
                    "<i class=\"fa fa-frown-o\" aria-hidden=\"true\"></i>" +
                    "这里是空的哦~快去借阅你喜欢的图书吧~" +
                    "</div>";
                $(str).appendTo(".container");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });
};