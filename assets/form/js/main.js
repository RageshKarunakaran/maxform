(function ($) {
    "use strict";

    $.fn.onlineForm = function (options) {

        var settings = $.extend({
            waitType : '50',
            waitClick : '500',
            waitLoading : '3000',
            clickable : 'true',
            validate : 'true',
        }, options);

        return this.each(function () {

            var $container = $(this),
                loading,
                phoneInput,
                stepCreate,
                stepSelect,
                doctorImage,
                typewriter,
                continueButton,
                continueButtonHide,
                validation,
                questionSettings,
                loadQuestion,
                loadQuestionBack,
                loadContent,
                loadContentData,
                setPreview,
                setSlider,
                run,
                policy,
                unfinished = JSON.parse(localStorage.getItem('unfinished')),

            loading = function() {
            var meterEl = $('.meter');

                var seconds = 0;
                var meterElWidth = meterEl.width();
                var progress = meterElWidth / (settings.waitLoading / 1000);
                var count = setInterval(function () {
                    if (seconds == (settings.waitLoading / 1000) - 1) {
                        clearInterval(count);
                        $('#loading').fadeOut(500, function () {
                            $('.wrapper').show();
                            //loadQuestion(0);

                        });
                    }
                    seconds += 1;
                    meterEl.find('span').width(meterEl.find('span').width() + progress);
                }, 1000);

            };

            var lastStep = 0;
            var stepNumber = 1;
            stepCreate = function (){
                var totalQuestion = $('.question').length;

                totalQuestion = totalQuestion - 2;

                for(var i=1;i<=totalQuestion;i++){
                    if(i==1|| i==10 || i==11 || i==4 || i==5 || i==6 || i==7 || i==8 || i==9){
                        var cls="hair-question hide";
                    }else{
                        cls = '';
                    }

                    if(i==1){
                        stepNumber = 1;
                    }else if(i==4){
                        stepNumber = 2;
                    }else if(i==5){
                        stepNumber = 3;
                    }else if(i==6){
                        stepNumber = 4;
                    }else if(i==7){
                        stepNumber = 5;
                    }else if(i==8){
                        stepNumber = 6;
                    }else if(i==9){
                        stepNumber = 7;
                    }else if(i==10){
                        stepNumber = 8;
                    }else if(i==11){
                        stepNumber = 9;
                    }


                    $('.steps').append('<a href="javascript:void(0);" data-step="'+i+'" class="step '+cls+'">'+stepNumber+'</a>');
                }

                setTimeout(function(){

                    if($('#sacpath.selected').length >= 2){
                        $('.steps .hair-question').removeClass('hide');
                    }

                },500);

                //$(body).append('<style type="text/css">#footer .steps .step.active::after{content: " / '+totalQuestion+'";}</style>');
                $(body).append('<style type="text/css">#footer .steps .step.active::after{content: " / 9";}</style>');

                lastStep = totalQuestion;
            }

            var currentStep;
            stepSelect = function(questionNumber){

                currentStep = questionNumber;

                /*if(questionNumber==4){
                    questionNumber = 2;
                }else if(questionNumber==5){
                    questionNumber = 3;
                }else if(questionNumber==6){
                    questionNumber = 4;
                }else if(questionNumber==7){
                    questionNumber = 5;
                }else if(questionNumber==8){
                    questionNumber = 6;
                }else if(questionNumber==9){
                    questionNumber = 7;
                }else if(questionNumber==10){
                    questionNumber = 8;
                }else if(questionNumber==11){
                    questionNumber = 9;
                }else if(questionNumber==12){
                    questionNumber = 10;
                }*/


                $('.steps .step').removeClass('active');
                $('.steps .step[data-step='+questionNumber+']').addClass('active');

            }

            /*phoneInput = intlTelInput(document.querySelector('#phone'), {
                initialCountry: 'auto',
                autoHideDialCode: false,
                separateDialCode: true,
                geoIpLookup: function (success, failure) {
                    $.ajax({
                        url: 'https://get.geojs.io/v1/ip/geo.json',
                        success: function (response) {
                            $('input[name="visit_ip"]').val(response.ip);
                            $('input[name="visit_city"]').val(response.city);
                            $('input[name="visit_country"]').val(response.country_code);
                            success(response.country_code);
                        }
                    });
                },
            });*/

            doctorImage = function(questionNumber){

                $('.title-image object').hide();
                $('.title-image object[data-step='+questionNumber+']').show();

            }

            var type;
            typewriter = function (questionNumber) {
                var char = 0;

                var title = $('#question-'+questionNumber).data('title');

                clearTimeout(type);

                var titleEl = $('.title-text h2');
                titleEl.empty();

                function typewriter_again(){
                    if (char < title.length) {

                        titleEl.text(titleEl.text() + title.charAt(char));
                        char = char + 1;
                        type = setTimeout(typewriter_again, settings.waitType);
                    }
                }

                typewriter_again();

            }

            continueButton = function(){
                setTimeout(function(){
                    $('.form-button').fadeIn(1000);
                },800);
            }

            continueButtonHide = function(){

                $('.form-button').hide();

            }

            questionSettings = function(questionNumber){

                if(questionNumber==1){

                    setTimeout(function(){
                        $('.form-button').hide();
                    },1000);

                    $('#footer .back').hide();
                    unSelectedHuman();
                    $('.application').hide();
                    $('.main').css('align-items','center');

                    //$('#human path').removeClass('selected');
                    //$('#human path.selected').trigger('click');


                }else if(questionNumber==2){
                    $('#footer .back').show();

                    //continueButton();
                    //$('.popup input').prop('checked',false);
                    $('.application').show();
                    $('.main').css('align-items','inherit');

                    $('#human').removeClass('human-male');
                    $('#human').removeClass('human-female');


                    if(gender=="male"){
                        $('#human').addClass('human-male');
                    }else{
                        $('#human').addClass('human-female');
                    }

                    setTimeout(function(){
                        humanSelectedButton();
                    },500);

                    if($('.human-body.hide').length == 0){
                        $('.main').css('align-items','inherit');
                    }


                }else if(questionNumber==3){

                    $('.main').css('align-items','inherit');
                    applicationList();
                    continueButton();
                    $('.application').show();

                    $('#footer').css('padding-bottom','100px');


                }else if(questionNumber==4){

                    $('#footer .back').show();

                    $('.question-female').hide();
                    $('.question-male').hide();

                    if(gender=='female'){
                        $('.question-female').css('display','flex');
                    }else if(gender=='male'){
                        $('.question-male').css('display','flex');
                        continueButton();

                    settings.clickable = false;
                    }

                    $('.main').css('align-items','center');


                }else if(questionNumber==5){

                    settings.clickable = true;

                }else if(questionNumber==6){

                 continueButton();

                }else if(questionNumber==7){


                }else if(questionNumber==8){

                    continueButton();

                }else if(questionNumber==9){



                }else if(questionNumber==10){
                    $('.main').css('align-items','center');

                    continueButton();

                }else if(questionNumber==11){

                    setTimeout(function(){
                        var phoneInput = intlTelInput(document.querySelector('#phone'), {
                        initialCountry: 'auto',
                        autoHideDialCode: false,
                        separateDialCode: true,
                        geoIpLookup: function (success, failure) {
                            $.ajax({
                                url: 'https://get.geojs.io/v1/ip/geo.json',
                                success: function (response) {
                                    $('input[name="visit_ip"]').val(response.ip);
                                    $('input[name="visit_city"]').val(response.city);
                                    $('input[name="visit_country"]').val(response.country_code);
                                    success(response.country_code);
                                }
                            });
                        },
                    });
                    },500);

                    continueButton();

                    setTimeout(function(){
                        localStorage.removeItem('unfinished');
                        localStorage.removeItem('human');
                    },500);

                }else if(questionNumber==12){

                    continueButton();

                    $('.application').hide();
                    $('#footer .col').hide();

                    setTimeout(function(){
                        localStorage.removeItem('unfinished');
                        localStorage.removeItem('human');
                    },500);


                }else if(questionNumber==13){

                    $('.application').hide();
                    $('#footer .col').hide();
                    $('.main').css('align-items','inherit');

                    setTimeout(function(){
                        localStorage.removeItem('unfinished');
                        localStorage.removeItem('human');
                    },500);

                }

            }

            var formData;
            var operationList = [];
            var data = {};
            var key = null;

            validation = function(questionNumber){

                if(questionNumber==4){//male



                    //continueButton();

                    var front = $('input[name=front]:checked').val();
                    var back = $('input[name=back]:checked').val();



                    if(front==undefined){

                        $('#question-'+questionNumber).find('.row.validate').eq(0).addClass('error');
                        settings.validate = false;

                    }else if(back==undefined){
                        $('#question-'+questionNumber).find('.row.validate').eq(1).addClass('error');
                        settings.validate = false;
                    }else{

                        settings.validate = true;

                    }

                }else if(questionNumber==11){

                    var get_email = $('input[name="email"]').val().trim();
                    var get_phone = $('input[name="phone"]').val().trim();
                    var get_policy = $('input[name="policy"]').is(':checked');
                    var get_policy_2 = $('input[name="policy_2"]').is(':checked');

                    if(get_email==""){

                        $('#question-11 input[name="email"]').addClass('error');

                        removeErrClass();
                        settings.validate = false;
                        return false;

                    }else if(!validEmail(get_email)){

                        $('#question-11 input[name="email"]').addClass('error');

                        removeErrClass();
                        settings.validate = false;
                        return false;

                    }else if(get_phone==""){

                        $('#question-11 input[name="phone"]').addClass('error');

                        removeErrClass();
                        settings.validate = false;
                        return false;

                    }else if(!get_policy){

                        $('#question-11 input[name="policy"]').addClass('error');

                        removeErrClass();
                        settings.validate = false;
                        return false;

                    }else if(!get_policy_2){

                        $('#question-11 input[name="policy_2"]').addClass('error');

                        removeErrClass();
                        settings.validate = false;
                        return false;

                    }

                    function removeErrClass(){
                        setTimeout(function(){
                            $('#question-11').find('input').removeClass('error');
                        },800);
                    }

                    function validEmail(e) {
                        var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
                        return String(e).search (filter) != -1;
                    }


                    var telDialCode = $('.iti__selected-dial-code').text().trim();

                    var form =  $('form').serializeArray();

                    formData = new FormData();

                    var title;

                    var human = JSON.parse(localStorage.getItem('human'));

                    $.each( human, function( key, value ) {

                        if(value.status == 1){

                           title = value.title;

                            $.each(value.app, function( key, value ) {

                                 operationList.push({
                                     [title] : value.val
                                 });

                            });

                        }

                    });

                    form.forEach(function(fields){
                        if(fields.name=="phone"){
                            //formData.append(fields.name, telDialCode+''+fields.value);

                            formData.append(fields.name, fields.value);
                            formData.append('country', telDialCode);
                        }else{
                            formData.append(fields.name, fields.value);
                        }
                    });

                    formData.append('operation', JSON.stringify(operationList));
                    formData.append('description', 'Almak istediği uygulamalar:'+JSON.stringify(operationList));

                     $.ajax({//lead
                         //url: 'https://crm.clinic/api/lead',
                         url: 'https://hook.eu1.make.com/vc44vwhdjg10in4sdexloawj656khgst',
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {

                            key = response.code;


                            if(response.status==false){

                                $('#question-11 input[name="phone"]').addClass('error');
                                removeErrClass();

                                settings.validate = false;
                                return false;

                            }else{

                                settings.validate = true;
                                return true;

                                removeErrClass();

                            }


                        }
                    });

                     settings.validate = true;
                     return true;



                }else if(questionNumber==12){

                    var formUpdate =  $('form').serializeArray();

                    var telDialCode = $('.iti__selected-dial-code').text().trim();

                    var formDataUpdate = new FormData();

                    formUpdate.forEach(function(fields){
                        if(fields.name=="phone"){
                            formDataUpdate.append(fields.name, fields.value);
                            //formDataUpdate.append(fields.name, telDialCode+''+fields.value);
                            formDataUpdate.append('country', telDialCode);
                        }else{
                            formDataUpdate.append(fields.name, fields.value);
                        }
                    });

                    var file = document.querySelector('input[type="file"]');
                    var ins = document.querySelector('input[type="file"]').files.length;

                    for (var x = 0; x < ins; x++) {
                        formDataUpdate.append("files[" + x + "]_", document.querySelector('input[type="file"]').files[x]);
                    }

                    formDataUpdate.append('code', key);

                    $.ajax({
                        type: "POST",
                        //url: 'https://crm.clinic/api/updateLead',
                        url: 'https://hook.eu1.make.com/vc44vwhdjg10in4sdexloawj656khgst',
                        data: formDataUpdate,
                        processData: false,
                        contentType: false,
                        success: function (response) {

                            settings.validate = true;
                            return true;

                        },
                    });



                }


            }


            var stepAtla = 0;

            loadQuestion = function(currentQuestionNumber){

                $('.question').hide();

                continueButtonHide();

                if(currentQuestionNumber>=1){
                    $('.back').removeClass('hide');
                }


                var nextQuestionNumber = currentQuestionNumber + 1;

                if(nextQuestionNumber==2){
                    nextQuestionNumber = 4;
                }


                /*stepAtla = 0;
                if(currentQuestionNumber==3){
                    if($('#sacpath.selected').length < 2){

                        if(stepAtla==0){

                            nextQuestionNumber = 10;
                            stepAtla = 1;

                        }

                    }
                }*/

                questionSettings(nextQuestionNumber);
                doctorImage(nextQuestionNumber);

                $('#question-'+nextQuestionNumber).fadeIn(1000);

                $('#question-'+currentQuestionNumber).removeClass('active');
                $('#question-'+nextQuestionNumber).addClass('active');

                typewriter(nextQuestionNumber);

                var currentQuestionData = nextQuestionNumber;

                stepSelect(nextQuestionNumber);

                var data = {
                    "currentQuestion": currentQuestionData,
                    "currentStep": currentStep,
                    "language" : language,
                    "data": $('form').serializeArray()
                };

                localStorage.setItem('unfinished', JSON.stringify(data));

                if (currentStep >= 15) {
                    localStorage.removeItem('unfinished');
                }

            }

            var stepAtlaGeri = 0;

            loadQuestionBack = function(currentQuestionNumber){

                var prevNumber = currentStep - 1;

                var aktifEkran = $('.question.active').data('question');

                if(prevNumber==1){
                    $('.back').addClass('hide');
                }


                if(prevNumber==3){
                    prevNumber = 1;
                }


                if(aktifEkran==10){
                    if($('#sacpath.selected').length < 2){
                        prevNumber = 3;
                    }
                }

                stepSelect(prevNumber);

                continueButtonHide();

                doctorImage(prevNumber);
                questionSettings(prevNumber);
                typewriter(prevNumber);

                $('#question-'+currentQuestionNumber).fadeOut(1000);

                setTimeout(function(){
                    $('.question').hide();
                    $('.question').removeClass('active');
                    $('#question-'+prevNumber).fadeIn(1000).addClass('active');
                },1000);

                //$('#question-'+currentQuestionNumber).removeClass('active');

            }

            var currentStepData = 0;
            loadContent = function () {
                if (unfinished != null) {
                    var currentQuestion = unfinished.currentQuestion;
                    currentStepData = unfinished.currentStep;

                    currentStep = unfinished.currentStep;
                    $.each(unfinished.data, function (index, input) {
                        if (input.value != null && input.value != "") {
                            updateInput(input.name, input.value);
                        }
                    });

                    gender = unfinished.data[0].value;

                    var get_language = unfinished.language;

                    if(get_language!=language){
                        localStorage.removeItem('unfinished');
                        localStorage.removeItem('human');
                        location.reload();
                    }

                }else{
                    currentQuestion = 0;
                }

                loadContentData(currentQuestion);

               /*setTimeout(function(){
                 if($('#sacpath.selected').length >= 1){
                     hairSelected('sac',currentStep);
                }
               },500);*/

            }

            loadContentData = function(currentQuestion){

                $('.question').hide();

                continueButtonHide();

                if(currentQuestion>=1){
                    $('.back').removeClass('hide');
                }

                questionSettings(currentQuestion);

                doctorImage(currentQuestion);

                $('#question-'+currentQuestion).fadeIn(1000);

                $('#question-'+currentQuestion).addClass('active');

                typewriter(currentQuestion);

                stepSelect(currentStepData);

                //alert(currentQuestion);

            }

            var sliderEl = document.getElementById('slider');

            function updateInput(name, value) {
                var input = $("[name=" + name + "]");
                var type = input.attr('type');
                switch (type) {
                    case 'radio':
                        input.val([value]);
                        $("[name=" + name + "]:checked").next().find('.option-text').addClass('selected');
                        break;
                    case 'date':
                        input.text(value);
                        break;
                    case undefined:
                        $(input).text(value);
                        break;
                    case 'text':
                        if (name == 'period') {
                            sliderEl.noUiSlider.set(value);
                        } else {
                            $(input).val(value);
                        }
                    break;
                }
            }

            var previewEl = $('#preview');
            var fadeSpeed = 500;
            var previewFrontEl = $('input[name="front"]');
            var previewBackEl = $('input[name="back"]');
            var previewBackVal;

            setPreview = function (side, value) {
                if (side == 'front') {
                    var previewFrontVal = value;
                    if (value == '0') {
                        previewBackEl.filter('[value="0"]').closest('[class^="col-"]').fadeOut((fadeSpeed / 10));
                        if (previewBackVal == '0') {
                            previewBackVal = undefined;
                            previewBackEl.prop('checked', false);
                        }
                    } else {
                        previewBackEl.filter('[value="0"]').closest('[class^="col-"]').fadeIn((fadeSpeed / 10));
                    }
                    previewEl.find('[id^="front-"]').stop().fadeOut((fadeSpeed / 10), function () {
                        previewEl.find('[id="front-' + value + '"]').stop().fadeIn((fadeSpeed / 10));
                    });
                } else if (side == 'back') {
                    previewBackVal = value;
                    if (value == '0') {
                        previewFrontEl.filter('[value="0"]').closest('[class^="col-"]').fadeOut((fadeSpeed / 10));
                        if (previewFrontVal == '0') {
                            previewFrontVal = undefined;
                            previewFrontEl.prop('checked', false);
                        }
                    } else {
                        previewFrontEl.filter('[value="0"]').closest('[class^="col-"]').fadeIn((fadeSpeed / 10));
                    }
                    previewEl.find('[id^="back-"]').stop().fadeOut((fadeSpeed / 10), function () {
                        previewEl.find('[id="back-' + value + '"]').stop().fadeIn((fadeSpeed / 10));
                    });
                }
            };

            var sliderEl = document.getElementById('slider');
            var periodEl = $('input[name="period"]');

            setSlider = function () {

                var lang = $('html').attr('lang');

                if(lang=="ar" || lang=="he"){
                    noUiSlider.create(sliderEl, {
                        start: 1,
                        step: 1,
                        range: {'min': 1, 'max': 10},
                        connect: [true, false],
                        direction: 'rtl'
                    });
                }else{
                    noUiSlider.create(sliderEl, {
                        start: 1,
                        step: 1,
                        range: {'min': 1, 'max': 10},
                        connect: [true, false],
                    });
                }

                sliderEl.noUiSlider.on('update', function () {
                    periodEl.val(Math.round(sliderEl.noUiSlider.get()));
                });
            };
            setSlider();

            var gender;
            $('.radio-select input').on('click', function (event) {

                var currentQuestionNumber = $(this).parents('.question-content').find('.question.active').data('question');

                var name = $(this).attr('name');
                var val = $(this).val();

                gender = $('input[name=gender]:checked').val();

                if(gender=="male"){
                    setPreview(name,val);
                }


                $('#question-'+currentQuestionNumber).find('.validate').removeClass('error');

                $(this).closest('.row').find('.option-text').removeClass('selected');
                $(this).next('.option').find('.option-text').addClass('selected');

                if (!settings.clickable) {

                    /*event.preventDefault();
                    return false;*/

                } else {

                    var loadQuestionTime = setTimeout(function(){
                        loadQuestion(currentQuestionNumber);
                    },settings.waitClick);

                }

            });

            $('.form-button').on('click', function (event) {



                var currentQuestionNumber = $(this).parents('.question-content').find('.question.active').data('question');

                validation(currentQuestionNumber);

                $(this).closest('.row').find('.option-text').removeClass('selected');
                $(this).next('.option').find('.option-text').addClass('selected');

                if (!settings.validate) {

                    event.preventDefault();
                    return false;

                } else {

                    var loadQuestionTime = setTimeout(function(){
                        loadQuestion(currentQuestionNumber);
                    },settings.waitClick);

                }

            });

            $('.back').on('click', function (event) {

                if(currentStepData!=0){
                    loadQuestionBack(currentStepData);
                }else{
                    loadQuestionBack(currentStep);
                }

            });

             $('input[type="file"]').on('change', function () {
                $('#file-info').html([this.files.length, ' File(s) to upload']);
            });

            run = function() {

                loading();
                stepCreate();

                if (unfinished != null) {
                    loadContent();
                }else{
                    loadQuestion(0);
                    typewriter(1);
                }

            };

            var policy = function(){

                $('.policy').click(function(){

                    var url = $(this).attr('data-url');

                    $('body').append('<div class="lead-form__policy"></div>');
                    $('body').append('<div class="lead-form__policy-overlay"></div>');

                    $('body .lead-form__policy').show();
                    $('body .form__policy-overlay').show();

                    $.ajax({
                        type: "GET",
                        url: 'https://lp.drserkanaygin.com/lead/'+url+'.php?lang='+language,

                        data: { },
                        success: function(data){
                            $('.lead-form__policy').html(data);
                        }
                    });

                });

                $(document).on('click','#lead-form__policy-close, .lead-form__policy-overlay',function(e) {
                    $('body .lead-form__policy, body .lead-form__policy-overlay').remove();
                });

            }

            run();
            policy();

        });

    };


}(jQuery));


var data = [];

function human(){

    var human = JSON.parse(localStorage.getItem('human'));

    if (human == null) {

        var totalPath = $('.human path').length;

        for(i=0;i<=totalPath;i++){

            var dataPath = $('.human path').eq(i).attr('data-path');
            var title = $('.human path').eq(i).attr('data-title');

            if(dataPath!=undefined){

                data.push({
                    name: dataPath,
                    title: title,
                    app: [],
                    status : 0,
                });

            }

        }

        localStorage.setItem('human', JSON.stringify(data));

    }

}


$(document).ready(function(){



    human();

    $(document).on('click','.accordion-title',function(){

        var status = $(this).find('.active').length;

        if(status==0){
            $('.accordion-text').slideUp(500);
            $('.accordion-title').find('.question-button').removeClass('active');
            $(this).find('.question-button').addClass('active');
            $(this).next().slideDown(function() {$(this).css('display', 'block');});
        }else{

            $(this).next('.accordion-text').slideUp(500);
            $('.accordion-title').find('.question-button').removeClass('active');

            status = 0;

        }

    });


    $(document).on('click','.popup-box-title .button',function(){

        var status = $(this).closest('.popup-box-title').find('.active').length;

        if(status==0){

            $('.accordion-text').slideUp(500);
            $('.accordion-title').find('.button').removeClass('active');

            $(this).addClass('active');
            $(this).closest('.popup-box-title').next().slideDown();

        }else{

            $(this).closest('.popup-box-title').next().slideUp(500);
            $(this).removeClass('active');

            status = 0;

        }

    });




     $('.human path').on('click', function () {

        var human = JSON.parse(localStorage.getItem('human'));

        var path = $(this).data('path');

        var status = $('#human svg path[data-path="'+path+'"].selected').length;

        var id = human.findIndex(function(e) { return e.name == path} );

        if(status==0){
            $('#human').find('[data-path="'+path+'"]').addClass('selected');
            human[id]['status'] = 1;
        }else{

            $('.popup .'+path+' input').prop('checked',false);

            $('#human').find('[data-path="'+path+'"]').removeClass('selected');
            human[id]['status'] = 0;
            human[id]['app'] = [];
        }

        if($('#sacpath.selected').length >= 2){
            $('.steps .hair-question').removeClass('hide');
        }else{
            $('.steps .hair-question').addClass('hide');
        }

        //hairSelected(path);

        localStorage.setItem('human', JSON.stringify(human));

        treatmentShow();

        applicationButtonAnimate();

        applicationList();

        treatmentSelected();

        humanSelectedButton();


    });


    var i=0;
    $('.application-button, .overlay').click(function(){

        if(i==0){
            $(this).addClass('selected');
            $(".application").animate( { bottom:'0' }, { queue:false, duration:500 });
            i=1;
            $('.overlay').show();

        }else{
            $(this).removeClass('selected');
            $(".application").animate( { bottom:'-340px' }, { queue:false, duration:500 });
            i=0;
            $('.overlay').hide();
        }

        $('.application').scrollTop(0);

    })


    $(document).on('click','.popup input',function(){


        var human = JSON.parse(localStorage.getItem('human'));

        var inputName = $(this).attr('name');
        var inputId = $(this).attr('data-id');
        var inputName = $(this).attr('data-input');
        var val = $(this).attr('value');

        var idx = human.findIndex(function(e) { return e.name == inputId} );
        var idx_sub =  human[idx]['app'].findIndex(function(e) { return e.id == inputName} );

        var checkData = $(this).attr('data-input');

        if ($(this).is(":checked")){
            human[idx]['app'].push({id: checkData, val: val});
            localStorage.setItem('human', JSON.stringify(human));
        }else{
           //human[idx]['app'].splice(human[idx]['app'].indexOf(checkData), 1);

           human[idx]['app'].splice(idx_sub, 1);

           localStorage.setItem('human', JSON.stringify(human));

        }

        humanSelected();

        applicationList();

        applicationButtonAnimate();

    });


    $(document).on('click','.application-item.delete',function(){

        var human = JSON.parse(localStorage.getItem('human'));

        var name = $(this).data('name');
        var id = $(this).data('id');
        var val = $(this).data('val');

        $(this).closest('.application-item').remove();
        $('.popup .'+name+' input[data-input="'+id+'"]').prop('checked',false);


        var idx = human.findIndex(function(e) { return e.name == name} );
        var idx_sub =  human[idx]['app'].findIndex(function(e) { return e.id == id} );

        human[idx]['app'].splice(idx_sub, 1);

        localStorage.setItem('human', JSON.stringify(human));


        applicationList();

    });

    humanSelected();

    treatments();

    treatmentSelected();

    treatmentShow();

    applicationList();

    humanSelected();

    $(document).on('click','.human-change-button',function(){

        var type = $(this).data('type');
        $('.human-change-button').removeClass('hide');

        if(type=="vucut"){
            $('.human-face').css('display','none');
            $('.human-body').fadeIn(1000);
            $('.human-change-button.vucut').addClass('hide');

        }else{
            $('.human-body').css('display','none');
            $('.human-face').fadeIn(1000);
            $('.human-change-button.yuz').addClass('hide');
        }

    });

     $('input[value="phone"]').on('click', function () {
        $('#time').slideToggle();
    });


     $('#human path').mouseenter( function(){
        var path = $(this).data("path");
       $('.'+path).addClass("common");
    });

    $('#human path').mouseleave( function (){
        var path = $(this).data("path");
        $('.'+path).removeClass("common");
    });

    setTimeout(function(){
        if($('#sacpath.selected').length <=0){
            $('#sacpath').trigger('click');
        }
    },500);

});//document_end


function humanSelected(){

    var human = JSON.parse(localStorage.getItem('human'));

    $.each( human, function( key, value ) {

        if(value.status == 1){

            $('#human').find('[data-path="'+value.name+'"]').addClass('selected');

        }

    });

}

var tedavi_html = "";
var islemler_html = "";
var i=0;

function treatments(){

    var treatments = tedaviler;

    $.each( treatments, function( key, value ) {

        var data_title = '<div class="popup-title"><span class="icon-'+value.id+'"></span>'+value.bolge_baslik+'</div>';

        var data_list = '<li><span class="accordion-title"></span><span class="accordion-text"></span></li>';

        var id = value.id;

        $.each( value.tedaviler, function( key, value ) {

            $.each( value.islemler, function( key, value ) {

                islemler_html += '<li><span class="accordion-title">'+value.islem+' <span class="question-button">?</span></span><span class="accordion-text">'+value.aciklama+'</span></li>';

            });

            if(language!='tr'){
                var uygulamalar = 'Our applications for '+value.tedavi+'.';
            }else{
                var uygulamalar = value.tedavi+' için uygulamalarımız.';
            }

            tedavi_html += '<li class="popup-box-title">' +
                        '<input type="checkbox" name="human" value="'+value.tedavi+'" data-id="'+id+'" data-input="'+value.id+'" class="styled-checkbox" id="styled-checkbox-'+i+'" />'+
                        '<label for="styled-checkbox-'+i+'">'+value.tedavi+'</label>'+
                        '<span class="button">apps</span>'+
                    '</li>'+
                    '<ul class="popup-box-treatments"><li class="popup-box-title-sub">'+uygulamalar+'</li>'+
                    ''+islemler_html+'</ul>';
            i++;

            islemler_html = "";

        });

        var data = '<div class="'+value.id+' hide">'+data_title+'<ul class="popup-box-list">'+tedavi_html+''+islemler_html+'</ul></div>';

        tedavi_html = "";

        $('.popup-content').append(data);

    });

}

function treatmentSelected(){

    var human = JSON.parse(localStorage.getItem('human'));

    $.each(human, function( key, value ) {

        var name = value.name;

        $.each(value.app, function( key, value ) {


            $('.popup .'+name+' input[data-input="'+value.id+'"]').prop('checked',true);


        });

    });

}

function treatmentShow(){

    var human = JSON.parse(localStorage.getItem('human'));

    $('.popup .popup-content > div').addClass('hide');

    $.each(human, function( key, value ) {


        if(value.status == 1){

            $('.popup .popup-content .'+value.name+'').removeClass('hide');

        }

    });

}

function applicationList(){


    var human = JSON.parse(localStorage.getItem('human'));

    $('.application-list').html('');

    var totalSelected = 0;

    var totalListItem = $('.popup input:checked').length;
    $('.application-button .count-2').text(totalListItem);

    $.each(human, function( key, value ) {

        if(value.status == 1){

            var title = value.title;
            var name = value.name;

            $('.application-list').append('<div class="box '+value.name+' clearfix"><div class="application-item title"><span class="icon-'+value.name+'"></span>'+title+'</div>');

            $.each(value.app, function( key, value ) {

                //$('.application-list .box.'+name+'').append('<div class="application-item text">'+title+' - '+value.val+' <span class="delete" data-name="'+name+'" data-id="'+value.id+'" data-value="'+value.val+'">x</span></div>')

                $('.application-list .box.'+name+'').append('<div class="application-item text delete" data-name="'+name+'" data-id="'+value.id+'" data-value="'+value.val+'">'+value.val+' <span class="delete">x</span></div>');

            });

             $('.application-list').append('</div>');

            totalSelected++;

        }

    });

    $('.application-button .count').text(totalSelected);

}

function applicationButtonAnimate(){

    $('.application-button .animate__animated').addClass('animate__flash');

    setTimeout(function(){
        $('.application-button .animate__animated').removeClass('animate__flash');
    },500);


}

function humanSelectedButton(){
    var totalSelected = $('#human path.selected').length;
    if(totalSelected>=1){
        $('.form-button').show();
    }else{
        $('.form-button').hide();
    }
}

function unSelectedHuman(){
    var totalPath = $('.human path').length;

        for(i=0;i<=totalPath;i++){

            var id = $('.human path').eq(i).attr('id');

            if( $('#'+id+'.selected').length>=1){
                $('#'+id+'').trigger('click');

            }


        }
}

function hairSelected(path,currentStep){

    if(currentStep==null){
        currentStep = 1;
    }else{
        currentStep = currentStep-1;
    }

    if(path=="sac"){

        $('.hair-question').addClass('step');

        if($('#sacpath.selected').length >= 1){

            $('.steps').html('');
            var totalQuestion = $('.question.step.hair-question').length;

            for(var i=1;i<=totalQuestion;i++){
            $('.steps').append('<a href="javascript:void(0);" data-step="'+i+'" class="step">'+i+'</a>');
            }

            $('.steps .step').eq(currentStep).addClass('active');

        }else{

            $('.hair-question').removeClass('step');

            $('.steps').html('');
            var totalQuestion = $('.question.step').length;

            for(var i=1;i<=totalQuestion;i++){
            $('.steps').append('<a href="javascript:void(0);" data-step="'+i+'" class="step">'+i+'</a>');
            }

            $('.steps .step').eq(currentStep).addClass('active');

        }

    }

}
