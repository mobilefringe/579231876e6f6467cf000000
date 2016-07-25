function init(e){
    $('<div class="modal-backdrop custom_backdrop"><img src="http://assets.codecloudapp.com/sites/554a79236e6f64713f000000/69e8cd982124dc73de1f5a67a627ee75/loading.gif" class="" alt=""></div>').appendTo(document.body);
}

function show_content(){
    $('.custom_backdrop').remove();
    $('.yield').fadeIn();
}