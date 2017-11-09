$('form').submit(function (ev) {
    ev.preventDefault();
    
    $.post(
        $(this).attr('action'),
        $(this).serialize(),
        function (res) {
            if (res.code == 'success') {
                location.href = '/'
            }else alert(res.message)
        }
    )
})