var pageModule = (function(){
    function LoadPage(target, routename, getScript){
        $.ajax({
            url: `/${routename}`,
            dataType: "html",
            success: function(html) {
               $(target).html(html);
               if(getScript){
                    $.getScript(`/js/${routename}.js`);
               }
            }
         });
    };

    function GetUsers(callback){
      $.get("/users", callback );  
    };

    function DoPageNavigation(){
        LoadPage("#content", $(this).attr("target"), true);
        $(".active").removeClass("active");
        $(this).addClass("active");
        $("#indicator").text($(this).attr("target"));
    };

    function RenderUiPopup(message){
        alert(message);
        event.preventDefault();
    }

    function ReloadActiveTab(){
        $(".nav-button.active").trigger("click");
    };

    return {
        DoPageNavigation: DoPageNavigation,
        GetUsers: GetUsers,
        LoadPage: LoadPage,
        RenderUiPopup: RenderUiPopup,
        ReloadActiveTab : ReloadActiveTab
    };
})();


$(document).ready(() => {
    $(".nav-button").click(pageModule.DoPageNavigation);
    $(".nav-button:first").trigger("click");
});

