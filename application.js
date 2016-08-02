function renderBanner(banner_template,home_banner,banners){
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    $.each( banners , function( key, val ) {
        today = new Date();
        start = new Date (val.start_date);
        start.setDate(start.getDate());
        if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
       }
       if (start <= today){
         if (val.end_date){
             end = new Date (val.end_date);
             end.setDate(end.getDate() + 1);
             if (end >= today){
               item_list.push(val);  
             }
             
         } else {
             item_list.push(val);
         }
       }
    });

    $.each( item_list , function( key, val ) {
        var repo_rendered = Mustache.render(banner_template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(home_banner).html(item_rendered.join(''));
}

function renderHours(container, template, collection, type){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    if (type == "reg_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == false) {
                switch(val.day_of_week) {
                case 0:
                    val.day = "Sunday";
                    break;
                case 1:
                    val.day = "Monday";
                    break;
                case 2:
                    val.day = "Tuesday";
                    break;
                case 3:
                    val.day = "Wednesday";
                    break;
                case 4:
                    val.day = "Thursday";
                    break;
                case 5:
                    val.day = "Friday";
                    break;
                case 6:
                    val.day = "Saturday";
                    break;
                
            }
            if (val.open_time && val.close_time && val.is_closed == false){
                var open_time = in_my_time_zone(moment(val.open_time), "hh:mm a");
                var close_time = in_my_time_zone(moment(val.close_time), "hh:mm a");
                val.h = open_time + " - " + close_time;
            } else {
                "Closed";
            }
                item_list.push(val);
            }
        });
        collection = [];
        collection = item_list;
    }
    
    if (type == "holiday_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == true) {
                holiday = moment(val.holiday_date);
                val.formatted_date = in_my_time_zone(holiday, "MMM DD")
                if (val.open_time && val.close_time && val.is_closed == false){
                    var open_time = in_my_time_zone(moment(val.open_time), "hh:mm a");
                    var close_time = in_my_time_zone(moment(val.close_time), "hh:mm a");
                    val.h = open_time + " - " + close_time;   
                    item_list.push(val);
                }
            }
        });
        collection = [];
        collection = item_list;
    }
    
    if (type == "closed_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == true) {
                holiday = moment(val.holiday_date);
                val.formatted_date = in_my_time_zone(holiday, "MMM DD")
                if (val.open_time && val.close_time && val.is_closed == true){
                    val.h = "Closed";
                    item_list.push(val);
                }
            }
        });
        collection = [];
        collection = item_list;
    }
    
    $.each( collection , function( key, val ) {
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);

    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}



function renderEvents(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.event_image_url_abs.indexOf('missing.png') >=0){
            val.logo = "http://assets.codecloudapp.com/sites/579231876e6f6467cf000000/image/png/1469552090000/PTC-Logo-x2.png";
        }
        var show_date = moment(val.show_on_web_date);
        start = moment(val.start_date);
        end = moment(val.end_date);
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        }
        else{
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        if(val.description.length > 100){
            val.description_short = val.rich_description.substring(0,100) + "...";
        }
        else{
            val.description_short = val.rich_description;
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}


















