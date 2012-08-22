    // исходные картинки
    var images = new Array();
    for (var i=0; i<20; i++)
    {
        images[i] = 'media/img/'+(i<10?'00':'0')+i+'.'+(i<6?'gif':'jpg');
    }

    // удваиваем их и кешируем
    var io = new Array();
    for(var i=0; i<images.length; i++)
    {
        io[images.length+i] = io[i] = new Image();
        io[images.length+i].src = io[i].src = images[i];
    }

    // перемешиваем картинки
    function shuffle_io()
    {
        for(var j, x, i = io.length; i; j = parseInt(Math.random() * i), x = io[--i], io[i] = io[j], io[j] = x);
    }

    // рисуем поле
    function draw_field()
    {
        $('#field').html('');
        var cl = $('<div></div>').addClass('cl');
        for(var i=0; i<io.length; i++)
        {
            var img = $('<img/>').attr('src', io[i].src);
            var wrapper = $('<a></a>').addClass('wrapper').html(img);
            $('#field').append(wrapper);
            if ((!((i+1)%Math.sqrt(io.length)))) $('#field').append(cl);
        }
    }

    // основная логика
    function add_callbacks()
    {
        $('.wrapper').click(function(){
            $('input').focus().blur();
            $(this).children('img:hidden').addClass('selected').show(0, function(){
                var selected = $('img.selected').not('.guessed');
                if (selected.length>1)
                {
                    if ( selected[0].src == selected[1].src )
                    {
                        $(selected).addClass('guessed');
                        if (!$('img:hidden').length) alert('You won!');
                    }
                    else
                    {
                        setTimeout(function(){
                            $(selected).hide().removeClass('selected');
                        }, 300);
                    }
                }
            });
            return false;
        });
    }

    // запускаем игрулю после готовности Документа
    $(document).ready(function() {

        $('#new-game').click(function(){
            shuffle_io();
            draw_field();
            add_callbacks();
        });

        $('#help').click(function(){
            $('img:hidden').addClass('help').show();
            setTimeout(function(){
                $('img.help').hide().removeClass('help');
            }, 1000);

        });

        $('#new-game').click();
    });