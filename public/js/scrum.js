var scrumModule = (function () {
    function RenderCards(set) {
        var $card = $("#card-template").html();
        var $status = $("#status-template").html();
        set.forEach((user, i) => {
            $(".scrum-column").append(
                $card.replace(/{{username}}/g, user.username)
                    .replace(/{{level}}/g, i)
                    .replace(/{{hasStatus}}/g, user.status ? $status.replace(/{{status}}/g, user.status) : "")
            );

    });
    var $rightCol = $(".scrum-column:last");
    $rightCol.find(".card").addClass("inactive").addClass("row-reverse-flex");
    $rightCol.find("i").removeClass("fa-angle-right").addClass("fa-angle-left");
    $(".card").click(function () {
        swapCardClass($(this).attr("level"));
    });
};

function swapCardClass($level) {
    var $active = $(`.card[level=${$level}]:not(.inactive)`);
    var $inactive = $(`.card[level=${$level}].inactive`);
    $inactive.removeClass("inactive");
    $active.addClass("inactive");
}

return {
    RenderCards: RenderCards
};
}) ();


$(document).ready(() => {
    pageModule.GetUsers(function (res) {
        scrumModule.RenderCards(res);
    });
});