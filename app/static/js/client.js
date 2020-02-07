var isAuthenticated = function () {
    if (window.localStorage.getItem('auth_user')) {
        return JSON.parse(window.localStorage.getItem('auth_user')).token;
    } else {
        return false;
    }
}

var authUser = function () {
    if (window.localStorage.getItem('auth_user')) {
        return JSON.parse(window.localStorage.getItem('auth_user'));
    } else {
        return false;
    }
}

var alertMessage = function (message='Success', mode='success') {
    $('.alert-wrapper').append('<aside class="alert alert--'+mode+'"><span>'+message+'</span><button class="alert__close-btn" type="button" onclick="alertNote.close(this)"><svg class="alert__close-icon" width="30"><use xlink:href="/static/images/sprite.svg#times"></use></svg></button></aside>')
}

var login = function(e) {
    e.preventDefault();
    var data = $("#login_form").serialize();
    $.ajax({
        url: main_site_url + '/api-token-auth/',
        dataType: 'json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        success: function( data, textStatus, jQxhr ){
            window.localStorage.setItem('auth_user', JSON.stringify(data));
            location.href = '/';
        },
        error: function( jqXhr, textStatus, errorThrown ){
            $('.login-error-panel').append('<aside class="dialog__alert alert alert--danger"><span class="error-message">' + JSON.parse(jqXhr.responseText).non_field_errors + '</span><button class="alert__close-btn" type="button" onclick="alertNote.close(this)"><svg class="alert__close-icon" width="30">' +
                   '<use xlink:href="' + ICONS + '#times"></use>' +
                '</svg></button></aside>')
        }
    });
}

var logout = function() {
    $.ajax({
        url: main_site_url + '/api-token-logout/',
        dataType: 'json',
        type: 'get',
        headers: {
            'Authorization': 'Token ' + isAuthenticated()
        },
        success: function( data, textStatus, jQxhr ){
            window.localStorage.removeItem('auth_user');
            location.href = '/';
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
            window.localStorage.removeItem('auth_user');
            // alertMessage(JSON.parse(jqXhr.responseText).non_field_errors, 'warning')
            location.href = '/';
        }
    });
}

var set_nav_active = function (url_parse) {
    $('[url-parse='+url_parse+']').addClass('is-active');
}

var password = function(e) {
    e.preventDefault();
    var data = $("#password_form").serialize();
    $.ajax({
        url: main_site_url + '/password/',
        dataType: 'json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        success: function( data, textStatus, jQxhr ){
            $('.password-error-panel').append('<p class="password-recovery__desc">If you have an account with us, we sent you password reset instructions.</p>')
        },
        error: function( jqXhr, textStatus, errorThrown ){
            $('.password-error-panel').append('<aside class="dialog__alert alert alert--danger"><span class="error-message">' + JSON.parse(jqXhr.responseText).non_field_errors + '</span><button class="alert__close-btn" type="button" onclick="alertNote.close(this)"><svg class="alert__close-icon" width="30">' +
                   '<use xlink:href="' + ICONS + '#times"></use>' +
                '</svg></button></aside>')
        }
    });
}

var password_reset = function(e) {
    e.preventDefault();
    var data = $("#reset_form").serialize();
    $.ajax({
        url: main_site_url + '/reset/',
        dataType: 'json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        success: function( data, textStatus, jQxhr ){
            location.href='/'
        },
        error: function( jqXhr, textStatus, errorThrown ){
            $('.password-error-panel').append('<aside class="dialog__alert alert alert--danger"><span class="error-message">' + JSON.parse(jqXhr.responseText).non_field_errors + '</span><button class="alert__close-btn" type="button" onclick="alertNote.close(this)"><svg class="alert__close-icon" width="30">' +
                   '<use xlink:href="' + ICONS + '#times"></use>' +
                '</svg></button></aside>')
        }
    });
}

var show_campaign = function(target_id, value) {
    $.ajax({
        url: main_site_url + '/list/campaign',
        dataType: 'json',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded',
        headers: {
            'Authorization': 'Token ' + isAuthenticated()
        },
        success: function( data, textStatus, jQxhr ){
            var sel = document.getElementById(target_id);
            data.results.forEach(function (e, i) {
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode(e.get_name) );
                opt.value = e.id;
                sel.appendChild(opt);
            })
            $(sel).val(value)
        },
        error: function( jqXhr, textStatus, errorThrown ){
            
        }
    });
}