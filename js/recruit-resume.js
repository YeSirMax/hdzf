$(function () {
    $('.fileBtn').click(function () {
        $('.file').click();
    })
    $('.file').change(function (e) {
        $('.fileUrl').html(e.target.files[0].name);
    })
    $('#job').val(decodeURI(Workbridage.getURLParams('title')));
    $('#jobClass').val(Workbridage.getURLParams('class'));
    function resumeBtn() {
        var _id = Workbridage.getURLParams('id');
        var _name = '';
        $.ajax({
            type: 'post',
            url: api + '',
            data: {
                name: '',
                phone: '',
                job: '',
                src: ''
            },
            success: function (res) {
                if (res.code === 0){
                    alert('投递成功~！期待您的加入');
                }
            },
            error:function (err) {
                alert(err);
            }
        })
    }
})