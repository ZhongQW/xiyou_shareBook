/*
    Create by WebStorm.
    User: ZhongQw
    Date: 2018/12/15
    Time: 22:27
*/
function diff(startTime, endTime){ //比较startTime < endTime，则返回-1，反之返回1 2019-01-02
    let startArr = startTime.split('-').map(val=>parseInt(val));
    let endArr = endTime.split('-').map(val=>parseInt(val));
    let startT = startArr[0]*365+startArr[1]*30+startArr[2];
    let endT = endArr[0]*365+endArr[1]*30+endArr[2];
    return (startT - endT)>0?1:-1;
}
function handleRent(event){
    $('.book_date').text(sessStorage.getItem('finalDay'));
    $("#btn_add_book").click(function() {
        let storage=window.sessionStorage;
        let localstorage=window.localStorage;
        debugger
        if(diff($('.book_date').text(), $('#book_end_time').val()) > 0){
            let data = {};
            data = {
                bookId: storage.book_id,
                endDate: $('#book_end_time').val()
            };
            console.log(data);
            data = JSON.stringify(data);
            $.ajax({
                type: "post",
                url: "http://47.94.97.26:8080/BSP/addrent",
                headers: {'Authorization': localstorage.token},
                data: data,
                success: function (res) {
                    let json = JSON.parse(res);
                    if (json.status == 'true') {
                        alert('借阅成功~');
                        window.location.reload();
                    } else {
                        alert("你有书逾期未还，不能借书！");
                    }
                },
                error: function (res) {
                    alert("加载失败" + JSON.stringify(res));
                }
            });
        }else{
            alert("请输入正确的还书时间~");
        }
    })
}
function handleColl(event){
    let storage=window.sessionStorage;
    let localstorage=window.localStorage;
    let data = {};
    data = {
        bookId: storage.book_id

    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/addCollection",
        headers: {'Authorization': localstorage.token},
        data: data,
        success: function (res) {
            let json = JSON.parse(res);
            if (json.status == 'true') {
                alert('收藏成功~');
                window.location.reload();
            } else {
                alert("你已收藏过该书，不可重复收藏！");
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });
}
function handleReserve(event){
    $('.book_date').text(sessStorage.getItem('endDate')+" 至 "+sessStorage.getItem('finalDay'));
    $("#btn_add_book").click(function() {
        let storage=window.sessionStorage;
        let localstorage=window.localStorage;
        debugger
        //$('#book_end_time').val(), sessStorage.getItem('endDate'), sessStorage.getItem('finalDay')
        if(diff(sessStorage.getItem('endDate'),$('#book_end_time').val())<0 &&
            diff(sessStorage.getItem('finalDay'),$('#book_end_time').val())>0) {
            let data = {};
            data = {
                bookId: storage.book_id,
                endDate: $('#book_end_time').val()
            };
            data = JSON.stringify(data);
            console.log(data);
            $.ajax({
                type: "post",
                url: "http://47.94.97.26:8080/BSP/addreserve",
                headers: {'Authorization': localstorage.token},
                data: data,
                success: function (res) {
                    console.log(res);
                    let json = JSON.parse(res);
                    if (json.status == 0) {
                        alert('预约成功~');
                        window.location.reload();
                    } else if (json.status == 1) {
                        alert('error');
                    } else if (json.status == 2) {
                        alert('你有书逾期则不可预约~');
                    } else if (json.status == 3) {
                        alert('您的还书时间不合理，可缩短借书时间~');
                    } else if (json.status == 4) {
                        alert("您的还书时间不合理，可延长还书时间~");
                    } else {

                    }
                },
                error: function (res) {
                    alert("加载失败" + JSON.stringify(res));
                }
            });
        }else{
            alert("请选择合适的还书时间哦~");
        }
    })
}
function handlePublic(){
    let commit = $("#talk").val();
    let storage=window.sessionStorage;
    let localstorage=window.localStorage;
    let data = {};
    data = {
        bookId: storage.book_id,
        content: commit
    };
    data = JSON.stringify(data);
    console.log(data);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/addComment",
        headers: {'Authorization': localstorage.token},
        data: data,
        success: function(res){
            let json = JSON.parse(res);
            if (json.status) {
                alert('评论成功~');
                window.location.reload();
            }else{
                alert("评论失败！");
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
}
var sessStorage=window.sessionStorage;
function resizeWindow(){
  // iframe height
  let curHeight = document.body.scrollHeight;
  console.log(curHeight)
  parent.window.document.querySelector('iframe').style.height = curHeight + 70 + 'px';
  window.document.body.style.overflow = 'hidden';
}
window.onload = function(){
    let storage=window.localStorage;
    let session=window.sessionStorage;
    var dataJson = {};
    console.log(session.book_id);
    dataJson = {
        bookId: session.book_id
    };
    dataJson = JSON.stringify(dataJson);
    // console.log(session.book_id);
    console.log(dataJson);
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/findonebook",
        headers: {'Authorization': storage.token},
        data: dataJson,
        success: function(res){
            let data = JSON.parse(res);
            console.log(data);
            $("#nav_book_name").text(data[0].bookName);
            $("#cover").attr('src', "http://47.94.97.26:8080/BSP"+data[0].imgUrl);
            let btn_str = "";
            if(data[0].status == '0') {
                sessStorage.setItem('finalDay', data[0].finalDay);
                btn_str = "                        <li>\n" +
                    "                            <input type=\"button\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"handleRent(this)\" value=\"借阅\">\n" +
                    "                            <input type=\"button\"  onclick=\"handleColl(this)\"  id='coll_btn'  value=\"收藏\">\n" +
                    "                            <input type=\"button\" data-toggle=\"modal\" data-target=\"#myModal\" disabled style='background-color: #eeeeee' onclick=\"handleReserve(this)\" value=\"预约\">\n" +
                    "                        </li>";
            }else if(data[0].status == '2') {
                btn_str = "                        <li>\n" +
                    "                            <input type=\"button\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"handleRent(this)\" disabled style='background-color: #eeeeee'  value=\"已被借阅\">\n" +
                    "                            <input type=\"button\" onclick=\"handleColl(this)\"  id='coll_btn'  value=\"收藏\">\n" +
                    "                            <input type=\"button\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"handleReserve(this)\" disabled style='background-color: #eeeeee' value=\"已被预约\">\n" +
                    "                        </li>";
            }else if(data[0].status == '3') {
                sessStorage.setItem('endDate', data[0].endDate);
                sessStorage.setItem('finalDay', data[0].finalDay);
                btn_str = "                        <li>\n" +
                    "                            <input type=\"button\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"handleRent(this)\" disabled style='background-color: #eeeeee' value=\"已被借阅\">\n" +
                    "                            <input type=\"button\" onclick=\"handleColl(this)\"  id='coll_btn'  value=\"收藏\">\n" +
                    "                            <input type=\"button\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"handleReserve(this)\" value=\"预约\">\n" +
                    "                        </li>";
            }
            let str = "<ul>                        <li><i class=\"fa fa-star-half-o\" aria-hidden=\"true\"></i>书名：<span>"+data[0].bookName+"</span></li>\n" +
                "                        <li><i class=\"fa fa-star-half-o\" aria-hidden=\"true\"></i>作者：<span>"+data[0].author+"</span></li>\n" +
                "                        <li><i class=\"fa fa-star-half-o\" aria-hidden=\"true\"></i>类型：<span>"+data[0].type+"</span></li>\n" +
                "                        <li><i class=\"fa fa-star-half-o\" aria-hidden=\"true\"></i>出版社：<span>雅众文化/浙江文艺出版社</span></li>\n" +
                "                        <li><i class=\"fa fa-star-half-o\" aria-hidden=\"true\"></i>出品方：<span> 雅众文化</span></li>\n" +
                "                        <li><i class=\"fa fa-star-half-o\" aria-hidden=\"true\"></i>当当价格：<span> 29.03元</span></li>\n" +
                "                        <li><i class=\"fa fa-star-half-o\" aria-hidden=\"true\"></i>所有者：<span>"+data[0].userName+"</span></li>\n" +
                "                        <li><i class=\"fa fa-star-half-o\" aria-hidden=\"true\"></i> 描述：<span>"+data[0].intro+"</span></li>\n" + btn_str
                "  </ul>";
            $(str).appendTo("#message");
            resizeWindow();
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
    $.ajax({
        type: "post",
        url: "http://47.94.97.26:8080/BSP/findCommentByBook",
        headers: {'Authorization': storage.token},
        data: dataJson,
        success: function(res){
            let data = JSON.parse(res);
            console.log(data);
            if(data.length == 0){
                let str = "        <div style='margin-top: -200px;margin-left: 200px;margin-bottom: 30px'><i class=\"fa fa-frown-o\" aria-hidden=\"true\"></i>还没有人发表评论哦~</div>\n";
                $(str).appendTo("#discuss");
            }else {
                for (let i = 0; i < data.length; i++) {
                    let str = "<div class=\"review\">\n" +
                        "                <table >\n" +
                        "                    <tr>\n" +
                        "                        <th rowspan=\"2\"> <img src=\"img//picture1.png\" class=\"rounded-circle\"> </th>\n" +
                        "                        <td  class=\"username\">" + data[i].name + "</td>\n" +
                        "                    </tr>\n" +
                        "                    <tr><td class=\"data\">" + data[i].createTime + "</td>\n" +
                        "                    </tr>\n" +
                        "                </table>\n" +
                        "                <div class=\"comment\">" + data[i].content + "</div>\n" +
                        "        </div>\n" +
                        "        <hr/>";
                    $(str).appendTo("#comment");
                }
            }
            resizeWindow();
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
    $.ajax({
        type: "get",
        url: "http://47.94.97.26:8080/BSP/findCollectionByUser",
        headers: {'Authorization': storage.token},
        data: {},
        success: function(res){
            let data = JSON.parse(res);
            for(let i=0;i<data.length;i++){
                if(data[i].bookId == session.book_id){
                    $("#coll_btn").val("已收藏");
                    $("#coll_btn").css('background-color', '#eeeeee');
                    break;
                }
            }
        },
        error: function(res){
            alert("加载失败"+JSON.stringify(res));
        }
    });
};
