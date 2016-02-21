/*HW8_game_puzzle of web2.0, qiangbo_14331229,group 11*/
/*the .js of the game_puzzle*/
/**/

$(document).ready(function() {

	var module = (function(){
		var count = 0;
		var if_mess = 0;
		var if_success = 0;
	    var form_x = 0;
	    var form_y  =0; /*Form the original block*/   
	    var rand_arr = new Array([16]);

        var k = 0;
	    _.times(4,function() {	    
	    	form_y = 200 + 80 *k;
	    	var i = 0;
	    	_.times(4,function() {
                form_x = 325 + 80 * i;
				form_position(form_x, form_y,count);
				count++;
				i++;
	    	});
			k++;
	    });
	 

	    $("#shufflebutton").click(function() {/*The botton to start*/
	    	rand_again();
	    });

        var counter = 0;
        _.times(16, function() { //Click the 16 bottons to start      
            to_onclick(counter);
            counter++;
        });
	    

	    function rand_again() {	//Get 15 rand number.
	    	var rand = _.random(15); //The first rand.
	    	rand_arr[0] = rand;//Get 15 rand.
	    	preductArr(rand_arr);
	    	messGame(); 	
	    }
	    
	    
	    function preductArr(rand_arr) { //Have a mess game.
	    	var if_add = true;
	    	var l = 1;
	    		while(l < 16) {
	    		var randx = _.random(15); //the randx has no apperal.
	    		for (var k = 0; k < l; k++) {
	    		    if (randx == rand_arr[k]) if_add = false; //no add.
	    		}
	    		if (if_add) {
	    			rand_arr[l] = randx;
	    			l++; 
	    		} 
	    	    if_add = true;
	    	}
	    }

	        /*
	    	_.times(16, function() {
	    	var randx = _.random(15);
	    	var k = 0;
	    		_.times(l,function() {
                    if (randx == rand_arr[k]) if_add = false; //no add.
                    k++;
                });
                if (if_add) {	rand_arr[l] = randx; l++;  } if_add = true;
                l++;
	    		} 
	    	    if_add = true;               
	    	});*/ 


	    function messGame() {
	    	var m = 0;
            _.times(8, function() {
                var temp = rand_arr[m];
	    		var temp1 = rand_arr[15-m];
	    		$("#puzzle"+temp1).attr('class', 'pu_css'+temp);
	    		$("#puzzle"+temp).attr("class", "pu_css"+temp1);
                m++;
            });
            if_mess = 1;
	    }

	    function to_onclick(counter) {
	        $("#puzzle"+ counter).click(function() {
	    		var ID1 = "puzzle"+ counter;
	    		var ID2;
	    		var find = 0;
	    		_.times(16,function() {
                    if ($("#puzzle" + find).attr('class') == "pu_css15") ID2 = find;
                    find++;
	    		});
	        	var C1 = String($("#puzzle"+ counter).attr('class'));
	        	var C2 = 'pu_css15';
	            if_move(ID1,ID2,C1,C2);
	        });
	    }
	    

		function if_move(ID1,ID2,C1,C2) {  // if the bolck can be move,we call this function to decide.
			var number1 = ID1.substr(6,8) - 0;
			var number2 = ID2;
	        if (if_mess == 1 && (
	        	number1 + 4 == number2 ||number1 - 4 == number2 ||
	        	number1 + 1 == number2 ||number1 - 1 == number2 )) {
	        	move_change(number1, ID2, C1, C2);
	        	if_succeed();      
	        }
		}
	    
	    
		function move_change(ID1, ID2, C1, C2) { //Change the two block.
			$('#puzzle'+ID1).attr("class", C2);
	        $('#puzzle'+ID2).attr("class", C1);	        
		}

		
	    function form_position(x, y,count) { /*to creat the 16 puzzle box*/	
	    	var button_move = document.createElement("input");
	        button_move.setAttribute("type","button");
		    button_move.style.position="absolute";
		    button_move.style.left =  x + 'px';
		    button_move.style.top =  y + 'px';
		    button_move.setAttribute("class", "pu_css"+count);
		    button_move.setAttribute("id", "puzzle"+count);
		    $("#puzzleblock").append(button_move);
	    }

	    
		function if_succeed() {  //Over the game and win.
            var succ = 0;
            _.times(16, function() {
            	no_succeed(succ);
            	succ++;
            });
			function no_succeed(succ) {
				if ($("#puzzle"+succ).attr('class') != 'pu_css'+succ) if_success = 1;	}
	        if (if_success == 0) alert("Congratulation!\nYou Win!");
	        if_success = 0;
		}

	})();

});