$(function () {
    function getAllCase() {
        $.ajax({
            type: 'post',
            url: api + 'cased/findcase',
            data: {date: new Date()},
            success:function (res){
                $('.navbar-child').html(addCassNav( res.list, 0, ''));
            }
        })
    }
    getAllCase();
    function addCassNav( list, num, str) {
        if(num < list.length){
            str += '<div class="navbar-child-item" title="'+ list[num].title +'">' +
                '<a href="case.html?_id='+ list[num]._id +'">'+ list[num].title +'</a>' +
                '</div>';
            num++;
            return addCassNav( list, num, str);
        }else{
            return str
        }
    }
})