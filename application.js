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
        var start = moment(val.start_date).tz('America/Toronto');
        var end = moment(val.end_date).tz('America/Toronto');
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        }
        else{
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        if(val.rich_description.length > 100){
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

function renderPromos(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
        }
        if(val.promo_image_url_abs.indexOf('missing.png') >= 0){
            val.promo_image_url_abs = "http://assets.codecloudapp.com/sites/579231876e6f6467cf000000/image/png/1469552090000/PTC-Logo-x2.png";
        }
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz('America/Toronto');
        var end = moment(val.end_date).tz('America/Toronto');
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        }
        else{
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        if(val.rich_description.length > 100){
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

function renderPromoDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
        }
        
        if(val.promo_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz('America/Toronto');
        var end = moment(val.end_date).tz('America/Toronto');
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        }
        else{
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderEventDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
        }
        
        if(val.event_image_url_abs.indexOf('missing.png') > -1){
            val.event_image_show="display:none";
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz('America/Toronto');
        var end = moment(val.end_date).tz('America/Toronto');
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        }
        else{
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}


function renderJobs(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.jobable_type == "Store") {
            var store_details = getStoreDetailsByID(val.jobable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
        }
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz('America/Toronto');
        var end = moment(val.end_date).tz('America/Toronto');
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        }
        else{
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        if(val.rich_description.length > 100){
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

function renderJobDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.jobable_type == "Store") {
            var store_details = getStoreDetailsByID(val.jobable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
        }
        if(val.contact_phone.length > 0){
            val.phone_show = "display:none";
        }
        else{
            val.phone_show = "display:block";
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz('America/Toronto');
        var end = moment(val.end_date).tz('America/Toronto');
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM DD")
        }
        else{
            val.dates = start.format("MMM DD") + " - " + end.format("MMM DD")
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderStoreList(container, template, collection, type, starter, breaker){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    var store_initial="";
    $.each( collection , function( key, val ) {
        if (type == "stores" || type == "category_stores"){
            if(!val.store_front_url ||  val.store_front_url.indexOf('missing.png') > -1 || val.store_front_url.length === 0){
                val.alt_store_front_url = "";
            } else {
                val.alt_store_front_url = getImageURL(val.store_front_url);    
            }
            
        }
        if(val.total_published_promos > 0){
            val.promo_exist = "display:inline"
        }
        else{
            val.promo_exist = "display:none"
        }
        
        //var categories = getStoreCategories();
        var current_initial = val.name[0];
        val.cat_list = val.categories.join(',')
        if(store_initial.toLowerCase() == current_initial.toLowerCase()){
            val.data_initial = current_initial;
            store_initial = current_initial;
            val.initial = "";
            val.show = "display:none;";
        }
        else{
            val.data_initial = current_initial;
            val.initial = current_initial;
            store_initial = current_initial;
            val.show = "display:block;";
        }
        if(val.is_coming_soon_store == true){
            val.coming_soon_store = "display:inline";
        }
        else{
            val.coming_soon_store = "display:none";
        }
        if(val.is_new_store == true){
            val.new_store = "display:inline";
        }
        else{
            val.new_store = "display:none";
        }
        if (val.promotions.length > 0){
            val.promotion_exist = "display:inline";
        }
        else{
            val.promotion_exist = "display:none";
        }
        
        val.map_x = val.x_coordinate - 19;
        val.map_y = val.y_coordinate - 58;
        val.block = current_initial + '-block';
        var rendered = Mustache.render(template_html,val);
        
        
        var upper_current_initial = current_initial.toUpperCase();
        if(starter == '#' && breaker == '#' && isInt(upper_current_initial)){
            item_rendered.push(rendered);
            $('.numbers_exist').css('display', 'block');
        }
        if (upper_current_initial.charCodeAt(0) < breaker.charCodeAt(0) && upper_current_initial.charCodeAt(0) >= starter.charCodeAt(0)){
            item_rendered.push(rendered);
        }

    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}


function renderGeneral(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderStoreDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if ((val.store_front_url).indexOf('missing.png') > -1){
            val.alt_store_front_url = "http://assets.codecloudapp.com/sites/579231876e6f6467cf000000/image/png/1469552090000/PTC-Logo-x2.png"
            // val.show_main_image="display:none"
        } else {
            val.alt_store_front_url = getImageURL(val.store_front_url); 
        }
        
        val.categories_list = getCategoriesNamesByStoreSlug(val.slug)
        if (val.categories.length > 1){
            val.categories_header = "Categories:"
        }
        if (val.categories.length == 1){
            val.categories_header = "Category:"
        }
        if (val.website != null && val.website.length > 0){
            val.show = "display:block";
        }
        else{
            val.show = "display:none";
        }
        if (val.phone != null && val.phone.length > 0){
            val.phone_show = "display:block";
        }
        else{
            val.phone_show = "display:none";
        }
        
        if (val.twitter != null && val.twitter.length > 0){
            val.twitter_show = "display:inline-block";
        }
        else{
            val.twitter_show = "display:none";
        }
        
        if((val.twitter == null || val.twitter == "") && (val.facebook == "" || val.facebook == null)){
            val.hide_social = "display:none;";
        }
        if (val.facebook != null && val.facebook.length > 0){
            val.facebook_show = "display:inline-block";
        }
        else{
            val.facebook_show = "display:none";
        }
        if (val.unit != null && val.unit.length > 0){
            val.address_show = "display:inline-block";
        }
        else{
            val.address_show = "display:none";
        }
        val.map_x_coordinate = val.x_coordinate - 19;
        val.map_y_coordinate = val.y_coordinate - 58;
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}


function renderGallery(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each( collection , function( key, val ) {
        val.image_url = getPropertyDetails().mm_host + val.photo_url;
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderPosts(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    var counter = 1;
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each( collection , function( key, val ) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "http://assets.codecloudapp.com/sites/579231876e6f6467cf000000/image/png/1469552090000/PTC-Logo-x2.png";
        } else {
            val.post_image = val.image_url;
        }
        if(val.body.length > 100){
            val.description_short = val.html_body.substring(0,100) + "...";
        }
        else{
            val.description_short = val.html_body;
        }
        val.description_short = val.description_short.replace("&amp;", "&");
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
        counter = counter+1;
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}















