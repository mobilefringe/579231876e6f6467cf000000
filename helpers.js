function init(e){
    $('<div class="modal-backdrop custom_backdrop"><img src="http://assets.codecloudapp.com/sites/554a79236e6f64713f000000/69e8cd982124dc73de1f5a67a627ee75/loading.gif" class="" alt=""></div>').appendTo(document.body);
}

function show_content(){
    $('.custom_backdrop').remove();
    $('.yield').fadeIn();
    $('.news_box').click(function(){
        $(this).toggleClass('full_height')
    });
    $('.dropdown').hover(
       function(){ $(this).addClass('open') },
       function(){ $(this).removeClass('open') }
    );
    
    $('.open_submenu').click(function(e){
        e.preventDefault();
        $(this).next().slideToggle();
        $(this).find('i').toggleClass('flip')
    });
    
    $('.open_menu').click(function(e){
        $('.mobile_menu').fadeIn();
        $('body').addClass('no_scroll')
    })
    
    $('.close_menu').click(function(e){
        $('.mobile_menu').fadeOut();
        $('body').removeClass('no_scroll')
    })
    
}


function in_my_time_zone(hour, format){
    return hour.tz('America/Toronto').format(format)
}

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function show_cat_stores(){
    $('.show_cat_stores').click(function(e){
        var cat_id = $(this).attr('data-id');
        $('.active_cat').removeClass('active_cat');
        $(this).addClass('active_cat');
        var rows = $('.cats_row');
        rows.hide();
        $('.store_initial').hide();
        $('#cat_name span').text($(this).text());
        $('#cat_name').css('display', 'block');
        $('#store_list_container, #store_list_container2').addClass("full_width");
        $.each(rows, function(i, val){
            var cat_array = val.getAttribute('data-cat').split(',');
            if ($.inArray(cat_id, cat_array) >= 0){
                $(val).show();
            }
        });
        $('html, body').animate({scrollTop : 0},800);
        e.preventDefault();
    });
    
    $('.show_all_stores').click(function(e){
        $('#store_list_container, #store_list_container2').removeClass("full_width");
        $('.active_cat').removeClass('active_cat');
        $(this).addClass('active_cat');
        var rows = $('.cats_row');
        if ($(window).width() > 768){
            rows.show();
        }
        else{
            rows.hide();
        }
        $.each($('.store_initial'), function(i, val){
           if ($(val).text().trim().length > 0){
               $(val).show();
           } 
        });
        
        $('#cat_name').hide();
        e.preventDefault();
    });
    
}


function load_map(reg, store_details, h, w){
    this_region = {};
    this_region = store_details.svgmap_region;
    map = $('#mapsvg_store_detail').mapSvg({
        source: getSVGMapURL(),
        colors: {stroke: '#aaa', hover: 0},
        disableAll: true,
        height:h,
        width:w,
        regions: reg,
        tooltipsMode:'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': true,'location': 'right' },
        pan:true,
        cursor:'pointer',
        responsive:true,
        zoomLimit: [0,10]
    });
    map.setViewBox(store_details.svgmap_region);
    map.selectRegion(store_details.svgmap_region);
    drop_pin(store_details.svgmap_region, map);
    
}


function drop_pin(id, map){
    var coords = map.get_coords(id);
    var height = parseInt(coords["height"])
    var width = parseInt(coords["width"])
    var x_offset = (parseInt(width) / 2);
    var y_offset = (parseInt(height) /2);
    
    map.setMarks([{ xy: [coords["x"] - 15 + x_offset, coords["y"] - 55 + y_offset],
              attrs: {
                        src:  'http://assets.codecloudapp.com/sites/570d369d6e6f643d60030000/image/png/1463000912000/pin2.png'     // image for marker
                      }
        }
        ])
    map.setViewBox(id);
    map.selectRegion(id);
    $('#btnZoomIn').click()
    $('#btnZoomIn').click()
    $('#btnZoomIn').click()
    $('#btnZoomIn').click()
    $('#btnZoomIn').click()
    $('#btnZoomIn').click()
    $('#btnZoomIn').click()
}

function init_map(reg, h, w){
    map = $('#mapsvg').mapSvg({
        source: getSVGMapURL(),
        colors: {stroke: '#aaa', hover: '#ffbe1d'},
        disableAll: true,
        height:h,
        width:w,
        regions: reg,
        tooltipsMode:'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': true,'location': 'right' },
        pan:true,
        panLimit:true,
        cursor:'pointer',
        responsive:true,
        zoomLimit: [0,10],
    });
    
    
}