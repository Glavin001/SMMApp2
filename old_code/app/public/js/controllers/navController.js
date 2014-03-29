$(document).ready(function( ){

    var $directionsPanel = $(".map-directions");
    var $toggleBtn = $('.toggle-panel-btn');

    $toggleBtn.click(function() {
        // Change icon
        if ( $directionsPanel.is(":visible") ) // Checks for display:[none|block], ignores visible:[true|false]
        {
            $toggleBtn.removeClass("glyphicon-collapse-up").addClass("glyphicon-collapse-down");
        } else {
            $toggleBtn.removeClass("glyphicon-collapse-down").addClass("glyphicon-collapse-up");
        }
        //
        $directionsPanel.slideToggle("slow");
    });

});
