/*
    Create by WebStorm.
    User: ZhongQw
    Date: 2018/12/8
    Time: 14:23
*/
function handleRemove(event){
    let storage = window.localStorage;
    console.log(event.parentNode.parentNode);
    let  id = event.parentNode.parentNode.getAttribute("data-index-status");
    let data = {};
    data = {
        bookId: id
    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/deletebook\n",
        headers: {'Authorization': storage.token},
        data: data,
        success: function (res) {
            let json = JSON.parse(res);
            if(json.status){
                location.reload();
                alert("下架成功！");
            }else{
                alert("下架失败");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });
}
window.onload = function() {
    let storage = window.localStorage;

    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/mybook",
        headers: {'Authorization': storage.token},
        data: {},
        success: function (res) {
            let data = JSON.parse(res);
            if(data.length != 0) {
                let ss="<table id=\"div1\">\n" +
                    "            <caption>\n" +
                    "                <h2>我的上传</h2>\n" +
                    "            </caption>\n" +
                    "            <thead>\n" +
                    "                <tr>\n" +
                    "                    <th>书籍名称</th>\n" +
                    "                    <th>书籍状态</th>\n" +
                    "                    <th>最晚下架时间</th>\n" +
                    "                    <th>是否下架</th>\n" +
                    "                </tr>\n" +
                    "            </thead>\n" +
                    "            <tbody></tbody></table>";
                $(ss).appendTo("#section-1");
                for (let i = 0; i < data.length; i++) {
                    let str = '';
                    if (data[i].status == '0') {
                        str = "<tr data-index-status = " + data[i].bookId + ">\n" +
                            "                        <td>" + data[i].name + "</td>\n" +
                            "                        <td>在架</td>\n" +
                            "                        <td>" + data[i].finalDay + "</td>\n" +
                            "                        <td><button class=\"btn_remove_book\" onclick=\"handleRemove(this)\">\n" +
                            "                                下架\n" +
                            "                            </button></td>\n" +
                            "                    </tr>"
                    } else if (data[i].status == '1') {
                        str = "<tr data-index-status = " + data[i].bookId + ">\n" +
                            "                        <td>" + data[i].name + "</td>\n" +
                            "                        <td>待审核</td>\n" +
                            "                        <td>" + data[i].finalDay + "</td>\n" +
                            "                        <td>\n" +
                            "                            <button class=\"no_btn_remove_book\" disabled onclick=\"handleRemove(this)\">\n" +
                            "                                下架\n" +
                            "                            </button>\n" +
                            "                        </td></td>\n" +
                            "                    </tr>"
                    } else if (data[i].status == '2') {
                        str = "<tr data-index-status = " + data[i].bookId + ">\n" +
                            "                        <td>" + data[i].name + "</td>\n" +
                            "                        <td>已预约</td>\n" +
                            "                        <td>" + data[i].finalDay + "</td>\n" +
                            "                        <td>\n" +
                            "                            <button class=\"no_btn_remove_book\" disabled onclick=\"handleRemove(this)\">\n" +
                            "                                下架\n" +
                            "                            </button>\n" +
                            "                        </td></td>\n" +
                            "                    </tr>"
                    } else if (data[i].status == '3') {
                        str = "<tr data-index-status = " + data[i].bookId + ">\n" +
                            "                        <td>" + data[i].name + "</td>\n" +
                            "                        <td>已借</td>\n" +
                            "                        <td>" + data[i].finalDay + "</td>\n" +
                            "                        <td>\n" +
                            "                            <button class=\"no_btn_remove_book\" disabled onclick=\"handleRemove(this)\">\n" +
                            "                                下架\n" +
                            "                            </button>\n" +
                            "                        </td></td>\n" +
                            "                    </tr>"
                    } else if (data[i].status == '4') {
                        str = "<tr data-index-status = " + data[i].bookId + ">\n" +
                            "                        <td>" + data[i].name + "</td>\n" +
                            "                        <td>下架</td>\n" +
                            "                        <td>" + data[i].finalDay + "</td>\n" +
                            "                        <td>\n" +
                            "                            <button class=\"no_btn_remove_book\" disabled onclick=\"handleRemove(this)\">\n" +
                            "                                下架\n" +
                            "                            </button>\n" +
                            "                        </td></td>\n" +
                            "                    </tr>"
                    } else {
                        alert('error');
                    }
                    $(str).appendTo("#div1 tbody");
                }
            }else{
                let str = "<div class='none_book'>" +
                    "<i class=\"fa fa-frown-o\" aria-hidden=\"true\"></i>" +
                    "这里是空的哦~快去上传你喜欢的图书吧~" +
                    "</div>";
                $(str).appendTo("#section-1");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });
}

