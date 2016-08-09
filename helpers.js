function init(e){
    $('<div class="modal-backdrop custom_backdrop"><img src="http://assets.codecloudapp.com/sites/554a79236e6f64713f000000/69e8cd982124dc73de1f5a67a627ee75/loading.gif" class="" alt=""></div>').appendTo(document.body);
    alert("stop")
}

function show_content(){
    $('.custom_backdrop').remove();
    $('.yield').fadeIn();
}

function get_day(id){
    switch(id) {
        case 0:
            return ("Sunday");
            break;
        case 1:
            return ("Monday");
            break;
        case 2:
            return ("Tuesday");
            break;
        case 3:
            return ("Wednesday");
            break;
        case 4:
            return ("Thursday");
            break;
        case 5:
            return ("Friday");
            break;
        case 6:
            return ("Saturday");
            break;
    }
}


function convert_hour(d){
    var h = (d.getUTCHours());
    var m = addZero(d.getUTCMinutes());
    var s = addZero(d.getUTCSeconds());
    if (h >= 12) {
        if ( h != 12) {
            h = h - 12;    
        }
        
        i = "pm"
    } else {
        i = "am"
    }
    return h+":"+m+i;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function get_month (id){
    var month = "";
    switch(id) {
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dec";
            break;
            
    }
    return month;
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

