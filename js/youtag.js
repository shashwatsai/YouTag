(function(){
    var renderTags = function(tagName){
        return "<li><a href='#' class='tag_category'>"+tagName+"</a></li>";
    }

    var renderList = function(link){
        return "<li><a href='"+link+"' target='_blank'>"+link.substring(0,30)+"....</a></li>"
    }

    $(window).load(function(){
        var current_tag = '';
        var app = new App();
        window.app = app;

        $("#instruction").css({'display':'none'});

        var listsCallback = function(lists, tagName){
            $("#instruction").css({'display':'none'});
            if(lists != undefined && lists != null && lists.length!=0){
                $("#current_tag_title").text("#"+tagName);
                $('#current_tag_list').html('');
                $("#add_link_to_tag").css({'display':'block'});
                $('#add_link_to_tag').text("+ "+tagName);
                for(var i = 0; i< lists.length; i++){
                    $('#current_tag_list').append(renderList(lists[i]));
                }                
            }else{
                $("#current_tag_title").text("#"+tagName);
                $("#add_link_to_tag").css({'display':'block'});
                $('#add_link_to_tag').text("+ "+tagName);
                $('#current_tag_list').html("No Links have been added Yet");
            }

        }

        var favTagsCallback = function(favTags){
            if(favTags != null && favTags != undefined && favTags.length !=0){
                $('#favTags').html(""); 
                for(var i=0; i<favTags.length; i++){
                    $('#favTags').append(renderTags(favTags[i]));  
                }
                            
            }else{
                $('#favTags').html(""); 
            }

        }

        app.controller.getFavoriteTags(favTagsCallback);


        var allTagsCallback = function(allTags){
            if(allTags != null && allTags != undefined && allTags.length!=0){
                $('#allTags').html("");
                var default_tag = allTags[0];
                current_tag = default_tag;
                for(var i=0; i<allTags.length; i++){
                    $('#allTags').append(renderTags(allTags[i]));  
                }  
                $("#current_tag_title").text("#"+default_tag);
                $("#add_link_to_tag").css({'display':'block'});
                $('#add_link_to_tag').text("+ "+default_tag);  
                app.controller.getListByTagName(default_tag, listsCallback);                
            }else{
                $('#allTags').html(""); 
                $("#current_tag_title").text("#StartByAddingTags");
                $("#add_link_to_tag").css({'display':'none'});
                $("#instruction").css({'display':'block'});
                $('#current_tag_list').html("");
            }

        }

        app.controller.getAllTags(allTagsCallback);


        

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
            $('#add_new_tag').css({'display':'none'});
            $('#all_links').css({'display':'block'});
        });

        /*

            Add new tag
            Once added return true or false
        */
        $('#adNewTag').on('click', function(){
            $('#sidebar').toggleClass('active');
            // hide current tag links
            $('#all_links').css({'display':'none'});

            // show add tag page
            $('#add_new_tag').css({'display':'block','visibility':'visible'});
        });

        $('#submitNewTag').on('click', function(){
            var newTagVal = $('#newTagVal').val();
            app.controller.addNewTag(newTagVal,newTagCallback);
        })

        var newTagCallback = function(result){
            if(result == true){
                $("#submitNewTag").removeClass("btn-info").addClass("btn-success").html("Successfully Added");   
            }else{
                $("#submitNewTag").removeClass("btn-info").addClass("btn-danger").html("failed"); 
            }

            setTimeout(function(){
                $("#submitNewTag").removeClass("btn-success").removeClass("btn-danger").addClass("btn-info").html("YouTag It"); 
            },1000); 
            app.controller.getFavoriteTags(favTagsCallback);
            app.controller.getAllTags(allTagsCallback)
        }
        $('#sidebar').on('click','.tag_category', function(evt){
            current_tag = evt.target.firstChild.nodeValue;
            app.controller.getListByTagName(current_tag, listsCallback);

        });



        // add link to current tag

        $("#add_link_to_tag").on('click',function(){
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                var url = tabs[0].url;
                app.controller.addLinkToTag(current_tag, url, addLinkCallback);
            });
        });

        $('#clearAll').on('click', function(){
            app.controller.clearAll();
            app.controller.getFavoriteTags(favTagsCallback);
            app.controller.getAllTags(allTagsCallback)

        })

        var addLinkCallback = function(result){

            if(result == true){
                $("#add_link_to_tag").removeClass("btn-primary").addClass("btn-success").html("Successfully Added");   
            }else{
                $("#add_link_to_tag").removeClass("btn-primary").addClass("btn-danger").html("failed"); 
            }
            setTimeout(function(){
                $("#add_link_to_tag").removeClass("btn-success").removeClass("btn-danger").addClass("btn-primary").html("+"+current_tag);
                app.controller.getListByTagName(current_tag, listsCallback);   
            },1000); 
        }


    });
})();
