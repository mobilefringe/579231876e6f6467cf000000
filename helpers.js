function init(e){
    $('<div class="modal-backdrop custom_backdrop"><img src="//codecloud.cdn.speedyrails.net/sites/554a79236e6f64713f000000/69e8cd982124dc73de1f5a67a627ee75/loading.gif" class="" alt=""></div>').appendTo(document.body);
    
    var current_year = moment().year();
    $("#current_year").text(current_year)
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
        $(this).find('i').toggleClass('flip');
    });
    
    $('.open_menu').click(function(e){
        $('.mobile_menu').fadeIn();
        $('body').addClass('no_scroll');
    });
    
    $('.close_menu').click(function(e){
        $('.mobile_menu').fadeOut();
        $('body').removeClass('no_scroll');
    });
    
    $('#header_newsletter_submit').click(function(){
        window.location = ('/newsletter?email=' + $('#header_newsletter').val())
    })
    var hours = getPropertyHours();
    renderHours('#reg_hours_container','#reg_hours_template', hours, 'reg_hours');
    
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
        $('#show_all_stores').removeClass('active_store_nav');
        $('#cat_dd').addClass('active_store_nav');
        $('.active_cat').removeClass('active_cat');
        $(this).addClass('active_cat');
        var rows = $('.cats_row');
        rows.hide();
        $('.store_initial').hide();
        $('#cat_name span').text($(this).text());
        $('#cat_name').css('display', 'block');
        $('#main_store_list, #store_list_container2').addClass("full_width");
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
        $('#show_all_stores').addClass('active_store_nav');
        $('#cat_dd').removeClass('active_store_nav');
        $('#main_store_list, #store_list_container2').removeClass("full_width");
        $('.active_cat').removeClass('active_cat');
        $(this).addClass('active_cat');
    
        var rows = $('.cats_row');
        rows.show();

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
                        src:  '//codecloud.cdn.speedyrails.net/sites/570d369d6e6f643d60030000/image/png/1463000912000/pin2.png'     // image for marker
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


function validateNewsletterForm(){
    if ($("#agree_newsletter").prop("checked") != true){
        alert("Please agree to the receiving newsletter.");
        $("#agree_newsletter").focus();
        return false;
    }
    else{
        return true;
    }
}

function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function render_instagram(data){
    $('#instafeed').html(data)
}

function get_insta(url,total, size, callback){
    // var html = '<a class="ig-image" target="_blank" href="{{{link}}}" ><img src="{{{image}}}" alt="{{caption_short}}" /></a>'
    var html = '<a class="ig-image" target="_blank" href="{{{link}}}" ><div class="ig-image-container" style="background-image: url({{{image}}})"></div></a>'
    var item_rendered = [];
    Mustache.parse(html); 
    log('fetching instagram data from: ' + url);
    $.getJSON(url).done(function(data){
        var insta_feed = data.social.instagram
        if(insta_feed != null){
            $.each(insta_feed, function(i,v){
                var feed_obj = {}
                if(v.caption != null){
                    feed_obj.caption = v.caption.text
                    feed_obj.caption_short = v.caption.text.substring(0, 20) + "..";
                } else {
                    feed_obj.caption = ""
                }
                feed_obj.image = v.images[size].url
                feed_obj.link = v.link
                if (i < total){
                    var ig_rendered =  Mustache.render(html,feed_obj);
                    item_rendered.push(ig_rendered.trim());
                }
            });
            callback(item_rendered.join(''))
        }
    });
}

function submit_contest(slug) {
    var contest_entry = {};
    var contest_data = {};
    contest_data.first_name = $('#first_name').val();
    contest_data.last_name = $('#last_name').val();
    contest_data.mailing_address = $('#address').val();
    contest_data.city = $('#city').val();
    contest_data.province = $('#province').val();
    contest_data.postal_code = $('#postal_code').val();
    contest_data.phone = $('#phone').val();
    contest_data.email = $('#email').val();
    contest_data.newsletter = $('#newsletter_signup').prop("checked");
    console.log("retail check", $('#retail_check').prop("checked"))
    contest_data.get_vendor_info = $('#retail_check').prop("checked");
    
    contest_entry.contest = contest_data;
    
    var propertyDetails = getPropertyDetails();
    var host = propertyDetails.mm_host.replace("http:", "");
    var action = host + "/contests/" + slug + "/create_js_entry"
    // var action ="//ptc.mallmaverickstaging.com/contests/" + slug + "/create_js_entry"
    $.ajax({
        url : action,
        type: "POST",
        data : contest_entry,
        success: function(data){
          $('#send_contact_success').show();
          $('.btn-primary').prop('disabled', false);
          $('#contest_form_20vic').trigger('reset');
        },
        error: function (data){
        $('#send_contact_error').show();
          $('.btn-primary').prop('disabled', false);
          $('#contest_form_20vic').trigger('reset');
        }
    });
}