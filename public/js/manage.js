var userModule = (function(){
    function RenderCards(set){
        var $card = $("#card-template").html().replace(/{{hasStatus}}/g, "");
        set.forEach((user, i) => $(".manage-column").append(
            $card.replace(/{{username}}/g, user.username).replace("{{level}}", i)
        ));
        var $button = $($("#button-template").html());
        $(".manage-column").append($button);
        $button.click(function(){
            addUser();
        });
        $(".card").click(function(){  
            loadUserPane.call(this);     
        });
    };

    function addUser(){
        $.post("/newuser", function(response){
            if(response){
                pageModule.ReloadActiveTab();
            }
        })
    }
    function loadUserPane(){
        var $username = $(this).attr("username");
        $("[name=username]").val($username);
        $("[name=prevusername]").val($username);
        $.get("/userstatus",{ username: $username }, (response) =>{
            $("[name=status]").val(response.status);
        });
    }

    function DeleteUser(){
        $.post("/deleteuser", {username: $("[name='username']").val()}, function(response){
            if(!response){
                alert("error");
            }else{
                alert("user deleted");
                pageModule.ReloadActiveTab();
            }
        });
    };

    function UpdateUserStatus(){
        var data = {
            username: $("[name='username']").val(), 
            prevusername: $("[name=prevusername]").val(),
            status: $("[name='status']").val()
        }
        $.post("/updateuser", data , function(response){
            if(!response){
                alert("error");
            }else{
                alert("user status updated");
            }
        });
    };

    return {
        RenderCards : RenderCards,
        DeleteUser: DeleteUser,
        UpdateUserStatus: UpdateUserStatus
    };
})();


$(document).ready(() => {
    pageModule.GetUsers(function(res){
        userModule.RenderCards(res);
    });
    pageModule.LoadPage(".manage-users","userpane", true);
});