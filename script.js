$(document).ready(function() {


    // variables
    var duration, minutes, seconds, visual, tame, breaker, full;
    
    // circle progress animation
    let progressBar = document.querySelector('.e-c-progress');
    let indicator = document.getElementById('e-indicator');
    let pointer = document.getElementById('e-pointer');
    let length = Math.PI * 2 * 100;
    
    progressBar.style.strokeDasharray = length;
    
    function update(value, timePercent) {
        var offset = - length - length * value / (timePercent);
        progressBar.style.strokeDashoffset = offset; 
        pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
    };
    
    
    // main functions
    $(".start").on('click', function() {
    
        // changes the text between start/stop
        $(this).html($(this).html() === '<div class="stop">Stop</div>' ? '<div class="start">Start</div>' : '<div class="stop">Stop</div>');
    
        // checks if interval is running by checking if tame was already assigned something
        if (tame) {
            clearInterval(tame);
            tame = false;
            return;
        }
    
        // sets duration to the session length value if not set, otherwise keep old duration
        duration = (duration || parseInt($(".snum").text()) * 60);
        full = (!full) ? duration : full;
    
        function timer(){
    
            // subtracts the duration by 1
            duration -= 1;
            update(duration, full);
    
            // takes the duration and gets the minutes and seconds
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
    
            // if minutes/seconds are below 10, it adds a 0 in front
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            
            // selects the html to put up the time
            visual = minutes + ":" + seconds;
            $(".clock").text(visual);
            
            // stops the timer once it reaches 0
            if (duration === 0) {
                clearInterval(tame);
    
                // starts break timer if it finishes session timer and starts session timer if it finishes break timer
                if (breaker) {
                    duration = parseInt($(".snum").text()) * 60;
                    breaker = false;
                    tame = setInterval(timer, 1000);
                    return;
                } else {
                    duration = parseInt($(".bnum").text()) * 60;
                    breaker = true;
                    tame = setInterval(timer, 1000);
                    return;
                }
            }
        }
    
        // so you don't have to wait a second for it to start and set the interval
        timer();
        tame = setInterval(timer, 1000);
    });
    
    
    // reset button;
    $(".reset").on('click', function() {
        clearInterval(tame);
        update(duration, duration);
        full = false;
        duration = false;
        tame = false;
        breaker = false;
        $(".start").html('start');
        $(".clock").text($(".snum").text() + ":00");
    });
    
    
    // plus-minus buttons
    $(".splus").on('click', function() {
        if (parseInt($(".snum").text()) < 100) {
            $(".snum").text(parseInt($(".snum").text()) + 1);
        }
    })
    $(".sminus").on('click', function() {
        if (parseInt($(".snum").text()) > 1) {
            $(".snum").text(parseInt($(".snum").text()) - 1);
        }
    })
    $(".bplus").on('click', function() {
        if (parseInt($(".bnum").text()) < 60) {
            $(".bnum").text(parseInt($(".bnum").text()) + 1);
        }
    })
    $(".bminus").on('click', function() {
        if (parseInt($(".bnum").text()) > 1) {
            $(".bnum").text(parseInt($(".bnum").text()) - 1);
        }
    })
    
    
    
    
    });